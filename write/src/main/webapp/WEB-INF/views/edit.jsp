<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="img/logo-icon.png">
    <title>EDIT</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/detail.css">
    <script src="js/edit.js"></script>
</head>
<body>
  <!-- 헤더 파일 포함 -->
<%@ include file="./include/header.jsp" %>	

      <div class="form-container" style="width: 800px; height: 860px; margin-bottom: 100px; margin-top: 50px;">
          <h1>게시글 수정하기</h1>
          
          <div class="form-group">
              <label for="name">제목</label>
              <input type="text" id="name" name="name" style="width: 95%;"/>
              <span id="name-error" style="color: red;"></span>
          </div>
      
          <div class="form-group">
              <label for="category">카테고리</label>
              <input type="text" id="category" name="category" style="width: 25%;" readonly/>
          </div>
            
          <div class="form-group">
              <label for="content">내용</label>
              <textarea id="content" name="content" style="width: 96%;"></textarea>
              <span id="content-error" style="color: red;"></span>
          </div>

          <div class="post-info">
              <span id="user-nick"></span>
              <span id="created-date"></span>
          </div>
            
          <div class="post-actions">
              <button id="backToList" style="margin-right: 10px; margin-bottom: 10px;">목록으로</button>
              <button id="editPost" style="margin-right: 10px; margin-bottom: 10px;">수정하기</button>
              <button id="deletePost" style="margin-right: 10px; margin-bottom: 10px;">삭제하기</button>
          </div>
      </div>
  </body>
</html>