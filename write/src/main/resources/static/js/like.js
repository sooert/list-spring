// 현재 로그인한 사용자의 ID 가져오기
function getCurrentUserNick() {
    return sessionStorage.getItem('userNick');
}


$(document).ready(function() {
    // URL에서 게시글 idx 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const boardIdx = urlParams.get('idx');
    
    // 현재 로그인한 사용자 정보 확인
    let currentUserNick = null;
    
    $.ajax({
        url: './api/user/getLoginUser',
        type: 'GET',
        success: function(user) {
            if (user) {
                currentUserNick = user.nick;
                // 좋아요 상태 확인
                checkLikeStatus(boardIdx, currentUserNick);
            }
        }
    });

    // 게시글 데이터 로드
    if (boardIdx) {
        loadBoardDetail(boardIdx);
    }

    // 목록으로 돌아가기 버튼 이벤트
    $('#backToList').click(function() {
        window.location.href = './index';
    });
    
    // 수정 버튼 이벤트
    $('#editPost').click(function() {
        const boardIdx = urlParams.get('idx');
        window.location.href = `./edit?idx=${boardIdx}`;
    });

    // 좋아요 버튼 이벤트
    $('#likePost').click(function() {
        if (!currentUserNick) {
            alert('로그인이 필요합니다.');
            location.href = './login';
            return;
        }
        const boardIdx = urlParams.get('idx');
        addLike(boardIdx, currentUserNick);
    });


});

// 게시글 상세 정보 로드
function loadBoardDetail(boardIdx) {
    $.ajax({
        url: `./api/board/detail?idx=${boardIdx}`,
        type: 'GET',
        success: function(board) {
            if (board) {
                $('#name').val(board.name);
                $('#category').val(board.category);
                $('#content').val(board.content);
                $('#user-nick').text(`작성자: ${board.user_nick}`);
                $('#view-count').text(`조회수: ${board.views}`);
                $('#created-date').text(`작성일: ${board.created_date}`);
                
                // 세션에서 현재 로그인한 사용자 정보 확인
                $.ajax({
                    url: './api/user/getLoginUser',
                    type: 'GET',
                    success: function(user) {
                        if (user && user.nick === board.user_nick) {
                            $('#editPost, #deletePost').show();
                        } else {
                            $('#editPost, #deletePost').hide();
                        }
                    },
                    error: function() {
                        $('#editPost, #deletePost').hide();
                        updateLikeCount(boardIdx);
                        $('#likePost').off('click').on('click', function(e) {
                            e.preventDefault();
                            location.href = './login';
                        });
                    }
                });
            } else {
                alert('게시글을 찾을 수 없습니다.');
                location.href = './index';
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('게시글 로드 중 오류가 발생했습니다.');
            location.href = './index';
        }
    });
}


// 좋아요 상태 확인
function checkLikeStatus(boardIdx, userNick) {
    $.ajax({
        url: `./api/like/checkLikeStatus?board_idx=${boardIdx}&user_nick=${userNick}`,
        type: 'GET',
        success: function(isLiked) {
            if (isLiked) {  
                $('#likePost').addClass('liked');
                alert('이미 좋아요를 눌렀습니다.');
            }
        }
    });
}

// 좋아요 추가
function addLike(boardIdx, userNick) {
    $.ajax({
        url: `./api/like/save?board_idx=${boardIdx}&user_nick=${userNick}`,
        type: 'POST',
        success: function() {
            updateLikeCount(boardIdx);
            $('#likePost').addClass('liked');
            alert('좋아요를 눌렀습니다.');
        },
        error: function() {
            alert('좋아요 추가 중 오류가 발생했습니다.');
        }
    });
}

// 좋아요 삭제
function deleteLike(boardIdx, userNick) {
    $.ajax({
        url: `./api/like/delete?board_idx=${boardIdx}&user_nick=${userNick}`,
        type: 'POST',
        success: function() {
            updateLikeCount(boardIdx);
            $('#likePost').removeClass('liked');
            alert('좋아요를 취소했습니다.');
        },
        error: function() {
            alert('좋아요 삭제 중 오류가 발생했습니다.');
        }
    });
}


