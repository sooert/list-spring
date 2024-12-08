$(document).ready(function(){
    // 페이지 로드시 유저 정보 불러오기
    loadUser();
    
    // 저장 버튼 클릭 이벤트
    $('#save-btn').on('click', function() {
        const userCode = localStorage.getItem('userCode');
        updateUser(userCode);
    });

    // 탈퇴 버튼 클릭 이벤트
    $('#delete-btn').on('click', function() {
        const con = confirm('탈퇴 하시겠습니까?');
        if(!con) return;

        deleteUser();
    }); 
    
    // 버튼 누르면 로그아웃
    $('#log-out-btn').on('click', function() {
        var con = confirm('로그아웃 하시겠습니까?');
        
        // 취소 누르면 리턴
        if(!con) return;
        
        // 세션 스토리지에서 사용자 정보 삭제
        sessionStorage.removeItem('me');
    
    // 로그아웃 API 호출
    $.ajax({ 
        url: "./api/user/logout", 
        type: "post",
        success: function(result) {
            alert("로그아웃 완료 되었습니다.");
            location.replace('./index');
        },
        error: function(e) {
            console.log(e);
            alert("로그아웃 실패했습니다. 다시 시도해주세요.");
            }
        });
    });

     //주소창 검색
     $('#address').on('click', function() {
        new daum.Postcode({
            oncomplete: function(data) {
                console.log(data.address);
                $('#address').val(data.address);
            }
        }).open(); 
    });

    // birth_date 입력 필드 래퍼 추가
    $('#birth_date').wrap('<div class="birth-date-container"></div>');
    
    // 달력 아이콘 추가
    $('.birth-date-container').append('<i class="fas fa-calendar-alt calendar-icon"></i>');

    // 달력 아이콘 클릭 이벤트
    $('.calendar-icon').on('click', function() {
        $('#birth_date').focus();
    });

    // birth_date 입력 필드 클릭 이벤트
    $('#birth_date').on('click', function() {
        $(this).attr('type', 'date');
    });

    // birth_date 포커스 아웃 이벤트
    $('#birth_date').on('blur', function() {
        if (!$(this).val()) {
            $(this).attr('type', 'text');
        }
    });

    // birth_date 최대값 설정 (오늘 날짜)
    const today = new Date().toISOString().split('T')[0];
    $('#birth_date').attr('max', today);
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
            
            // 날짜 형식 변환 (YYYY-MM-DD)
            if (user.birth_date) {
                const formattedDate = new Date(user.birth_date).toISOString().split('T')[0];
                $('#birth_date').val(formattedDate);
            }
            
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
            const birth_date = $('#birth_date').val();

            // 날짜 형식 검증
            if (!isValidDate(birth_date)) {
                alert('올바른 생년월일을 입력해주세요 (YYYY-MM-DD)');
                return;
            }

            if (!nick || !address || !birth_date) {
                alert('모든 필드를 입력해주세요.');
                return;
            }

            $.ajax({
                url: './api/user/update',
                type: 'POST',
                data: {
                    user_code: user.user_code,
                    nick: nick,
                    address: address,
                    birth_date: birth_date
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

// 날짜 유효성 검사 함수
function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && date < new Date();
}

function deleteUser() {
    $.ajax({
        url: './api/user/getLoginUser',
        type: 'GET',
        success: function(user) {
            if (!user || !user.user_code) {
                alert('로그인이 필요합니다.');
                return;
            }

            $.ajax({
                url: './api/user/delete',
                type: 'POST',
                data: {
                    user_code: user.user_code
                },
                success: function(response) {
                    if (response === 'ok') {
                        alert('탈퇴 되었습니다.');

                        // 세션 스토리지에서 사용자 정보 삭제
                        sessionStorage.clear();
                        localStorage.clear();

                        window.location.href = `./index`;
                    } else {
                        alert('탈퇴에 실패했습니다.');
                    }
                },
                error: function(xhr, status, error) {
                    console.error("업데이트 실패:", error);
                    alert('탈퇴 중 오류가 발생했습니다.');
                }
            });
        }
    });
}
