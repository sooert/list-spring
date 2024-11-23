<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="img/logo-icon.png">
    <title>JOIN</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/join.js"></script>
    <link rel="stylesheet" href="css/join.css">
</head>
<body>
    <header>
        <h1>JOIN</h1>
    </header>

    <!-- 회원가입 페이지 -->
	<div class="center-container" style="flex-direction: column;">
    <!-- 회원가입 폼 -->
		<div class="form-container">
			<form id="signupForm">

				<!-- 아이디 입력 -->
				<div class="input-with-btn">
					<input id="id" name="id" type="text" placeholder="아이디" required autocomplete="username"/>
					<button class="idcheck" type="button" aria-label="아이디 중복확인">중복확인</button>
				</div>
				<div id="id-result-txt" class="validation-message" style="margin-bottom: 15px;"></div>

				<!-- 비밀번호 입력 -->
				<div class="input-with-btn">
					<input id="pw" name="password" type="password" placeholder="비밀번호를 입력하세요" 
						required autocomplete="new-password" minlength="8"/>
				</div>
				
				<!-- 비밀번호 확인 -->
				<div class="input-with-btn">
					<input id="pwcheck" type="password" placeholder="비밀번호를 다시 입력하세요" 
						required autocomplete="new-password"/>
				</div>
				<div id="pw-result-txt" class="validation-message" style="margin-bottom: 15px;"></div>
				
				<!-- 닉네임 입력 -->
				<div class="input-with-btn">
					<input id="nick" name="nickname" type="text" placeholder="닉네임" required/>
					<button class="nickcheck" type="button" aria-label="닉네임 중복확인">중복확인</button>
				</div>
				<div id="nick-result-txt" class="validation-message" style="margin-bottom: 15px;"></div>

				<!-- 회원가입 버튼 -->
				<button type="submit" id="signup-btn">회원가입</button>
			</form>
		</div>
	</div>
</body>
</html>