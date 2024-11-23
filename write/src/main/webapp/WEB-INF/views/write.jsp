<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="img/logo-icon.png">
    <title>WRITE</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="css/write.css">
    <script src="js/write.js"></script>
</head>
<body>
    <!-- 헤더 파일 포함 -->
	<%@ include file="./include/header.jsp" %>	

        <div class="form-container" style="width: 600px; height: 680px; margin-bottom: 100px; margin-top: 50px;">
            <h1>글쓰기</h1>
            
      
              <div class="form-group">
                <label for="name">제목*</label>
                <input type="text" id="name" name="name" style="width: 95%;" placeholder="제목을 입력하세요." required/>
              </div>
        
              <div class="form-group">
                <label for="category">카테고리*</label>
                <span>
                    <select id="category" name="category">
                        <option value="공지사항">공지사항</option>
                        <option value="자유게시판">자유게시판</option>
                        <option value="Q&A">Q&A</option>
                    </select>
                </span>
              </div>
              
              <div class="form-group">
                <label for="content">내용*</label>
                <textarea id="content" name="content" style="width: 96%;" placeholder="내용을 자세히 적어주세요."></textarea>
              </div>

              <button id="write-save-btn" style="display: block; margin: 0 auto;" type="submit">등록</button>
            </form>
     

</body>
</html>