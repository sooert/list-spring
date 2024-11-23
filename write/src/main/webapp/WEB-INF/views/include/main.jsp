<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- jQuery를 먼저 로드 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="./js/main.js"></script>
<link rel="stylesheet" href="./css/style.css">

<c:if test="${empty sessionScope.me}">  
    <div class="search-bar">
        <button class="write-button" onclick="location.href='./write'">글쓰기</button>
    <div style="display: flex; gap: 10px;">
        <input type="text" id="searchInput" placeholder="검색...">
        <button onclick="searchPosts()">검색</button>
    </div>
    </div> 
</c:if>

<c:if test="${not empty sessionScope.me}">
    <div class="search-bar">
        <button class="r-write-button" onclick="location.href='./write'">글쓰기</button>
    <div style="display: flex; gap: 10px;">
        <input type="text" id="searchInput" placeholder="검색...">
        <button onclick="searchPosts()">검색</button>
    </div>
    </div> 
</c:if>

