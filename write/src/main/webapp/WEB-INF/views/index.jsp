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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/jquery.twbsPagination.min.js"></script>
    <script src="js/main.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

    <!-- 헤더 파일 포함 -->
	<%@ include file="./include/header.jsp" %>	


    <main>
        <h2>게시판</h2>
        <div class="tabs">
            <a href="#" class="active">ALL</a>
            <a href="./notice">NOTICE</a>
            <a href="./free">FREE</a>
            <a href="./question" style="margin-top: 2px;">Q&A</a>
        </div>

        <table class="board">
            <!-- 여기에 동적으로 데이터가 들어갈 예정 -->
            <!-- <thead>
                <tr>
                    <th>No</th>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>작성시간</th>
                    <th>조회수</th>
                </tr>
            </thead> -->
            <tbody id="board-body">
                
            </tbody>
        </table>

        <!-- 메인 파일 포함 -->
		<%@ include file="./include/main.jsp" %>
    </main>

    <footer>
        <p><a href="https://github.com/sooert">GITHUB</a></p>
        <p>&copy; 2024 게시판 제출용</p>
    </footer>
</body>
</html>
