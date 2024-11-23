$(document).ready(function() {

    // 폼 제출 이벤트 
    $('#write-save-btn').on('click', function(e) {
        e.preventDefault();

        // 클릭 시점에 데이터 추출
        const boardData = { 
            name: $('#name').val(),
            category: $('#category').val(),
            content: $('#content').val()
        };
    
        // 유효성 검사
        const validationChecks = {
            name: '제목을 입력해주세요.',
            category: '카테고리를 선택해주세요.',
            content: '내용을 입력해주세요.'
        };  

        for (const [field, message] of Object.entries(validationChecks)) {
            if (!boardData[field]) {
                alert(message);
                return;
            }
        }
        
        $.ajax({
            url: './api/board/create',
            type: 'POST',
            data: boardData,  // JSON.stringify 제거하고 일반 객체로 전송
            success: function(response) {
                if (response === "로그인이 필요합니다") {
                    alert('로그인이 필요합니다.');
                    location.href = './login';
                } else if (response === "ok") {
                    alert('게시글 등록이 완료되었습니다.');
                    location.href = './index';
                }
            },
            error: function() {
                alert('게시글 등록 중 오류가 발생했습니다.');
            }
        });
    });
});


