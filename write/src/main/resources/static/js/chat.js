// 전역 변수 설정
const urlParams = new URLSearchParams(window.location.search);
let currentUserNick = null;

$(document).ready(function() {  
    // 현재 로그인한 사용자 정보 가져오기
    $.ajax({
        url: './api/user/getLoginUser',
        type: 'GET',
        success: function(user) {
            if (user) {
                currentUserNick = user.nick;
            }
        }
    });

    // 댓글 버튼 이벤트 수정
    $('#chatPost').click(async function() {
        $('.comment-section').toggle();
        const boardIdx = urlParams.get('idx');
        try {
            await loadComments(boardIdx);
        } catch (error) {
            console.error('댓글 로드 중 오류:', error);
        }
    });

    // 댓글 등록 버튼 이벤트
    $('#submitComment').click(function() {
        if (!currentUserNick) {
            location.href = './login';
            return;
        }
        submitComment();
    });

    // 댓글 좋아요 버튼 이벤트
    $('.comment-like-button').off('click').on('click', async function() {
        const commentId = $(this).data('comment-id');
        const $button = $(this);
        const $icon = $button.find('i');
        const $count = $button.find('.comment-like-count');
        
        try {
            const response = await $.ajax({
                url: './api/user/getLoginUser',
                type: 'GET'
            });
            
            if (!response) {
                alert('로그인이 필요합니다.');
                location.href = './login';
                return;
            }
            
            const isLiked = await $.ajax({
                url: './api/chat/checkLikeStatus',
                type: 'POST',
                data: { chat_idx: commentId }
            });
            
            if (isLiked > 0) {
                await $.ajax({
                    url: './api/chat/deleteLike',
                    type: 'POST',
                    data: { chat_idx: commentId }
                });
                $icon.removeClass('fa-solid').addClass('fa-regular');
                const currentCount = parseInt($count.text()) || 0;
                $count.text(Math.max(0, currentCount - 1));
            } else {
                await $.ajax({
                    url: './api/chat/addLike',
                    type: 'POST',
                    data: { chat_idx: commentId }
                });
                $icon.removeClass('fa-regular').addClass('fa-solid');
                const currentCount = parseInt($count.text()) || 0;
                $count.text(currentCount + 1);
            }
        } catch (error) {
            console.error('좋아요 처리 중 오류:', error);
            alert('좋아요 처리 중 오류가 발생했습니다.');
        }
    });

    // 댓글 삭제 버튼 이벤트    
    $('.comment-delete-button').click(function() {
        const commentId = $(this).data('comment-id');
        if (confirm('정말로 삭제하시겠습니까?')) {
            deleteComment(commentId);
            alert('댓글이 삭제되었습니다.');
        }
    });

});

// 댓글 등록 함수 수정
function submitComment() {
    const boardIdx = new URLSearchParams(window.location.search).get('idx');
    const commentText = $('#commentText').val().trim();
    
    if (!commentText) {
        alert('댓글 내용을 입력해주세요.');
        return;
    }

    $.ajax({
        url: './api/chat/save',
        type: 'POST',
        data: {
            board_idx: boardIdx,
            chat: commentText
        },
        success: async function(response) {
            if (response === "ok") {
                $('#commentText').val(''); 
                await loadComments(boardIdx);
                alert('댓글이 등록되었습니다.');
            } else {
                alert(response); // "로그인이 필요합니다" 등의 메시지 표시
                if (response === "로그인이 필요합니다") {
                    location.href = './login';
                }
            }
        },
        error: function(xhr) {
            console.error('댓글 등록 오류:', xhr);
            alert('댓글 등록 중 오류가 발생했습니다.');
        }
    });
}

// 댓글 목록 로드 함수 수정
function loadComments(boardIdx) {
    return new Promise((resolve, reject) => {
        // 먼저 현재 로그인한 사용자 정보를 가져옴
        $.ajax({
            url: './api/user/getLoginUser',
            type: 'GET',
            success: function(currentUser) {
                // 댓글 목록을 가져오는 요청
                $.ajax({
                    url: `./api/chat/findAll?board_idx=${boardIdx}`,
                    type: 'GET',
                    success: async function(comments) {
                        const $commentList = $('.comment-list');
                        $commentList.empty();
                        
                        if (comments && comments.length > 0) {
                            for (const comment of comments) {
                                // 각 댓글의 좋아요 상태 확인
                                const isLiked = await $.ajax({
                                    url: './api/chat/checkLikeStatus',
                                    type: 'POST',
                                    data: { chat_idx: comment.chat_idx }
                                });
                                
                                const heartClass = isLiked > 0 ? 'fa-solid' : 'fa-regular';
                                
                                const commentHtml = `
                                    <div class="comment-item" data-comment-id="${comment.chat_idx}">
                                        <div class="comment-header">
                                            <div class="comment-info">
                                                <span class="comment-author">${comment.user_nick}</span>
                                                <button class="comment-like-button ${isLiked > 0 ? 'liked' : ''}" data-comment-id="${comment.chat_idx}">
                                                    <i class="${heartClass} fa-heart"></i>
                                                    <span class="comment-like-count">${comment.like_count || 0}</span>
                                                </button>
                                            </div>
                                            ${currentUser && currentUser.nick === comment.user_nick ? 
                                                `<button class="comment-delete-button" data-comment-id="${comment.chat_idx}">삭제</button>` : ''}
                                        </div>
                                        <div class="comment-content">${comment.chat}</div>
                                        <span class="comment-date">${comment.created_date}</span>
                                    </div>
                                `;
                                $commentList.append(commentHtml);
                            }
                            
                            attachCommentEventHandlers();
                            $('#chatCount').text(comments.length);
                        } else {
                            $commentList.append('<p>등록된 댓글이 없습니다.</p>');
                            $('#chatCount').text('0');
                        }
                        resolve(comments);
                    },
                    error: function(error) {
                        console.error('댓글 로드 중 오류:', error);
                        reject(error);
                    }
                });
            },
            error: function(error) {
                console.error('사용자 정보 로드 중 오류:', error);
                reject(error);
            }
        });
    });
}

// 댓글 이벤트 핸들러 수정
function attachCommentEventHandlers() {
    // 댓글 좋아요 버튼
    $('.comment-like-button').off('click').on('click', async function() {
        const commentId = $(this).data('comment-id');
        const $button = $(this);
        const $icon = $button.find('i');
        const $count = $button.find('.comment-like-count');
        
        try {
            const response = await $.ajax({
                url: './api/user/getLoginUser',
                type: 'GET'
            });
            
            if (!response) {
                location.href = './login';
                return;
            }
            
            // 버튼의 liked 클래스로 현재 상태 확인
            const isLiked = $button.hasClass('liked');
            
            if (isLiked) {
                // 이미 좋아요가 되어있으면 삭제
                await $.ajax({
                    url: './api/chat/deleteLike',
                    type: 'POST',
                    data: { chat_idx: commentId }
                });
                $button.removeClass('liked');
                $icon.removeClass('fa-solid').addClass('fa-regular');
                const currentCount = parseInt($count.text()) || 0;
                $count.text(Math.max(0, currentCount - 1));
            } else {
                // 좋아요가 안되어있으면 추가
                await $.ajax({
                    url: './api/chat/addLike',
                    type: 'POST',
                    data: { chat_idx: commentId }
                });
                $button.addClass('liked');
                $icon.removeClass('fa-regular').addClass('fa-solid');
                const currentCount = parseInt($count.text()) || 0;
                $count.text(currentCount + 1);
            }
        } catch (error) {
            console.error('좋아요 처리 중 오류:', error);
            alert('좋아요 처리 중 오류가 발생했습니다.');
        }
    });

    // 댓글 삭제 버튼
    $('.comment-delete-button').off('click').on('click', async function() {
        try {
            const commentId = $(this).data('comment-id');
            if (confirm('정말로 삭제하시겠습니까?')) {
                await deleteComment(commentId);
            }
        } catch (error) {
            console.error('댓글 삭제 중 오류:', error);
        }
    });
}

// 댓글 삭제 함수 수정
function deleteComment(commentId) {
    return new Promise((resolve, reject) => {
        if (!commentId) {
            reject(new Error('댓글 ID가 없습니다.'));
            return;
        }

        const boardIdx = new URLSearchParams(window.location.search).get('idx');
        $.ajax({
            url: `./api/chat/delete?chat_idx=${commentId}`,
            type: 'POST',
            success: async function() {
                try {
                    await loadComments(boardIdx);
                    updateCommentCount(boardIdx);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            },
            error: function(error) {
                console.error('댓글 삭제 중 오류:', error);
                alert('댓글 삭제 중 오류가 발생했습니다.');
                reject(error);
            }
        });
    });
}

// 댓글 수 업데이트 함수 추가
function updateCommentCount(boardIdx) {
    $.ajax({
        url: `./api/chat/findAll?board_idx=${boardIdx}`,
        type: 'GET',
        success: function(comments) {
            const commentCount = comments ? comments.length : 0;
            $('#chatCount').text(commentCount);
        },
        error: function(error) {
            console.error('댓글 수 조회 중 오류:', error);
            $('#chatCount').text('0');
        }
    });
}