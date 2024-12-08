<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="img/logo-icon.png">
    <title>HOME</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script src="js/myPage.js"></script>
    <link rel="stylesheet" href="css/myPage.css">
    
<body>

    <!-- 헤더 파일 포함 -->
	<%@ include file="./include/header.jsp" %>	
 

    <main>
        <h2>MY PAGE</h2>

        <main class="main-container">  
            <div class="font-box">
              <label class="d-font">ID</label>
              <div id="id" class="d-box">-</div>
            </div>

            <div class="font-box">
              <label class="d-font">NICKNAME</label>
              <input type="text" id="nick" class="d-box" value="-">
            </div>

            <div class="font-box">
              <label class="d-font">ADDRESS</label>
              <input type="text" id="address" class="d-box" value="-">
            </div>

            <div class="font-box">  
              <label class="d-font">BIRTH DATE</label>
              <input type="date" id="birth_date" class="d-box" value="-" required/>
            </div>

            <div class="font-box">
              <label class="d-font">CREATED DATE</label>
              <div id="created_date" class="d-box">-</div>
            </div>

            <div class="button-box">
                <button id="save-btn">저장</button>
                <button id="delete-btn">탈퇴</button>
            </div>
        </main>
</body>
</html>
