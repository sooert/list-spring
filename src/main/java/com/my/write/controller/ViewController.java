package com.my.write.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.my.write.entity.User;

@Controller
public class ViewController {

	// 로그인 여부 확인 후 페이지 이동
	private String getViewName(HttpSession session, String viewName) {
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "redirect:/login";
		}
		return viewName;
	}

	@GetMapping("admin")
	public String admin() {
		return "admin";
	}

	/**
	 * 홈 페이지 이동 http://127.0.0.1:8080/write/index
	 */
	@GetMapping("index")
	public String index() {
		return "index";
	}

	/**
	 * 공지사항 페이지 이동 http://127.0.0.1:8080/write/notice
	 */
	@GetMapping("notice")
	public String notice() {
		return "notice";
	}

	/**
	 * 자유게시판 페이지 이동 http://127.0.0.1:8080/write/free
	 */
	@GetMapping("free")
	public String free() {
		return "free";
	}

	/**
	 * Q&A 페이지 이동 http://127.0.0.1:8080/write/question
	 */
	@GetMapping("question")
	public String question() {
		return "question";
	}

	/**
	 * 글쓰기 페이지 이동 http://127.0.0.1:8080/write/write
	 */
	@GetMapping("write")
	public String write(HttpSession session) {
		return getViewName(session, "write");
	}

	/**
	 * 회원가입 페이지 이동 http://127.0.0.1:8080/write/join
	 */
	@GetMapping("join")
	public String join() {
		return "join";
	}

	/**
	 * 로그인 페이지 이동 http://127.0.0.1:8080/write/login
	 */
	@GetMapping("login")
	public String login() {
		return "login";
	}

	/**
	 * 게시글 상세 페이지 이동 http://127.0.0.1:8080/write/detail
	 */
	@GetMapping("detail")
	public String detail() {
		return "detail";
	}

	/**
	 * 게시글 수정 페이지 이동 http://127.0.0.1:8080/write/edit
	 */
	@GetMapping("edit")
	public String edit(HttpSession session) {
		return getViewName(session, "edit");
	}

	/**
	 * 마이페이지 페이지 이동 http://127.0.0.1:8080/write/myPage
	 */
	@GetMapping("myPage")
	public String myPage(HttpSession session) {
		return getViewName(session, "myPage");
	}
}
