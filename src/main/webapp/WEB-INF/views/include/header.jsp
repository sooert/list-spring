<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- jQuery를 먼저 로드 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="./js/header.js"></script>
<link rel="stylesheet" href="./css/style.css">

<header>
	<h1>WEB Board</h1>
	<nav>
		<ul>
			<c:if test="${empty sessionScope.me}">
				<li><a href="./login">LOGIN</a></li>
				<li><a href="./join">JOIN</a></li>
			</c:if>

			<c:if test="${not empty sessionScope.me && sessionScope.me.id eq 'admin' && pageContext.request.servletPath eq '/WEB-INF/views/index.jsp'}">
				<li><a href="#" id="find-all-btn">유저 전체 찾기</a></li>
			</c:if>

			<c:choose>
				<c:when test="${pageContext.request.servletPath eq '/WEB-INF/views/myPage.jsp'}">
					<!-- 마이 페이지 일때 -->
					<span style="margin-right:10px; color:black; font-weight:bold;">${sessionScope.me.nick} 님</span>
					<li><a href="#" id="home-btn">HOME</a></li>
					<li><a href="#" id="log-out-btn">LOGOUT</a></li>
				</c:when>
				<c:otherwise>
					<c:if test="${not empty sessionScope.me}">
						<!-- 로그인 상태일때 -->
						<span style="margin-right:10px; color:black; font-weight:bold;">${sessionScope.me.nick} 님</span>
						<li><a href="#" id="my-page-btn">MY PAGE</a></li>
						<li><a href="#" id="log-out-btn">LOGOUT</a></li>
					</c:if>
				</c:otherwise>
			</c:choose>

			
		</ul>
	</nav>
</header>