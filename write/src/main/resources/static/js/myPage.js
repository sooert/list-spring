$(document).ready(function(){
    // 페이지 로드시 유저 정보 불러오기
    loadUser();
    
    // 저장 버튼 클릭 이벤트
    $('#save-btn').on('click', function() {
        const userCode = localStorage.getItem('userCode');
        updateUser(userCode);
    });
    
    //버튼 누르면 로그아웃
    $('#out-btn').on('click', function() {
        var con = confirm('로그아웃 하시겠습니까?');
    
        if(!con) {
    
            return;
        }
        // localStorage에서 사용자 정보 제거 추가
        localStorage.removeItem('user');

        alert('로그아웃되었습니다.');
        location.replace('./index');
    })

     //주소창 검색
     $('#address').on('click', function() {
        new daum.Postcode({
            oncomplete: function(data) {
                console.log(data.address);
                $('#address').val(data.address);
            }
        }).open();
    });
});

// 유저 정보 로드
function loadUser() {
    $.ajax({
        url: './api/user/getLoginUser',
        type: "GET",
        success: function(user) {
            if (!user || !user.id) {
                alert('로그인이 필요합니다.');
                location.href = './login';
                return;
            }
            // 기존 HTML 요소에 직접 값 설정
            $('#id').text(user.id);
            $('#nick').val(user.nick);
            $('#address').val(user.address);
            $('#created_date').text(user.created_date);
        },
        error: function() {
            console.error("유저 정보 로드 실패");
            alert('사용자 정보를 불러오는데 실패했습니다.');
        }
    });
}

// 유저 정보 수정 함수 수정
function updateUser() {
    $.ajax({
        url: './api/user/getLoginUser',
        type: 'GET',
        success: function(user) {
            if (!user || !user.user_code) {
                alert('로그인이 필요합니다.');
                return;
            }
            const nick = $('#nick').val();
            const address = $('#address').val();

            if (!nick || !address) {
                alert('모든 필드를 입력해주세요.');
                return;
            }

            $.ajax({
                url: './api/user/update',
                type: 'POST',
                data: {
                    user_code: user.user_code,
                    nick: nick,
                    address: address
                },
                success: function(response) {
                    if (response === 'ok') {
                        alert('회원정보가 수정되었습니다.');
                        window.location.href = `./index`;
                        loadUser();
                    } else {
                        alert('회원정보 수정에 실패했습니다.');
                    }
                },
                error: function(xhr, status, error) {
                    console.error("업데이트 실패:", error);
                    alert('회원정보 수정 중 오류가 발생했습니다.');
                }
            });
        }
    });
}