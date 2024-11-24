$(document).ready(function() {
    // URL에서 게시글 idx 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const boardIdx = urlParams.get('idx');

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
        updatePost(boardIdx);
    });
    
    // 삭제 버튼 이벤트
    $('#deletePost').click(function() {
        if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            const boardIdx = urlParams.get('idx');
            deletePost(boardIdx);
        }
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

// 게시글 삭제 함수
function deletePost(boardIdx) {
    $.ajax({
        url: './api/board/delete',
        type: 'POST',
        data: {
            board_idx: boardIdx
        },
        success: function(response) {
            if (response === 'ok') {
                alert('게시글이 삭제되었습니다.');
                window.location.href = './index';
            } else {
                alert(response);
            }
        },
        error: function() {
            alert('게시글 삭제 중 오류가 발생했습니다.');
        }
    });
}

// 현재 로그인한 사용자의 ID 가져오기
function getCurrentUserNick() {
    return sessionStorage.getItem('userNick');
}

// 게시글 수정 함수 추가
function updatePost(boardIdx) {
    const name = $('#name').val();
    const category = $('#category').val();
    const content = $('#content').val();

    // 입력 값 검증
    if (!name || !category || !content) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    $.ajax({
        url: './api/board/update',
        type: 'POST',
        data: {
            board_idx: boardIdx,
            name: name,
            category: category,
            content: content
        },
        success: function(response) {
            if (response === 'ok') {
                alert('게시글이 수정되었습니다.');
                window.location.href = `./detail?idx=${boardIdx}`;
            } else {
                alert(response);
            }
        },
        error: function() {
            alert('게시글 수정 중 오류가 발생했습니다.');
        }
    });
}