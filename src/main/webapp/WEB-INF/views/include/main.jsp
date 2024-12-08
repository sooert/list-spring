<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- jQuery를 먼저 로드 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/jquery.twbsPagination.min.js"></script>
<script src="./js/main.js"></script>
<link rel="stylesheet" href="./css/main.css">
<link rel="stylesheet" href="./css/style.css">


<!-- 게시글 목록이 표시되는 부분 -->
<div id="board-container">
    <!-- 여기에 게시글 테이블이 들어갑니다 -->
</div>

<!-- 페이지네이션을 게시글 아래로 이동 -->
<div class="pagination-container"  style="padding-top: 20px;">
    <ul id="pagination-demo" class="pagination-sm"></ul>
</div>

<div class="search-bar">
    <c:if test="${empty sessionScope.me}">
        <div style="display: flex; gap: 10px;" class="search-bar">
            <button class="write-button" onclick="location.href='./write'">글쓰기</button>
            <input type="text" id="searchInput" placeholder="검색...">
            <button onclick="searchPosts()">검색</button> 
        </div>
    </c:if>
    <c:if test="${not empty sessionScope.me}">
        <div style="display: flex; gap: 10px;" class="search-bar">
            <button class="r-write-button" onclick="location.href='./write'">글쓰기</button>
            <input type="text" id="searchInput" placeholder="검색...">
            <button onclick="searchPosts()">검색</button> 
        </div>
    </c:if>
    
</div>

