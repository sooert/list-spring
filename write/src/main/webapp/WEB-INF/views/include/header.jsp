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

			<c:if test="${not empty sessionScope.me}">
				<span style="margin-right:10px; color:black; font-weight:bold;">${sessionScope.me.nick} 님</span>
				<li><a href="#" id="log-out-btn">LOGOUT</a></li>
			</c:if>
		</ul>
	</nav>
</header>