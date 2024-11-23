$(document).ready(function() {
	
	// 한글 입력 방지
	 $('#id, #pw').on('keyup', function(e) {
		var id = $(this).val();
	    var pw = $(this).val();

		$(this).val(id.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
		$(this).val(pw.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
	});

	// 버튼 클릭 이벤트로 변경
	$("#login-btn").on("click", function(e) {
		e.preventDefault(); // 폼 기본 제출 동작 중지
		
		var id = $("#id").val();
		var pw = $("#pw").val();

        $.ajax({
            url: "./api/user/login",
            type: "GET",
            data: {
                id: id, 
                pw: pw
            },
            success: function(result){
                
                if(result==''){
                    alert("가입된 계정이 아닙니다.");
					location.replace('./login');
				}else{
					alert("로그인 완료 되었습니다.");
					location.replace('./index');
				}
			},
			error: function(e){
				console.log(e);
			}
		});
	});
});
