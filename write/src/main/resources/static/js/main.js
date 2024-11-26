$(document).ready(function() {
    $('.write-button').click(function() {
        alert('로그인후 글쓰기를 이용해주세요.');
        location.href = './login';
    });

});

// 페이지별 게시물을 로드하는 함수
function loadPostsByPage(page) {
    $.ajax({
        url: './posts',
        method: 'GET',
        data: { page: page },
        success: function(response) {
            // 게시물 목록 업데이트 로직
            updatePostList(response);
        },
        error: function(xhr, status, error) {
            console.error('게시물을 로드하는 중 오류가 발생했습니다:', error);
        }
    });
}
