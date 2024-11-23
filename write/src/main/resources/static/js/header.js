$(document).ready(function() {

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
});
