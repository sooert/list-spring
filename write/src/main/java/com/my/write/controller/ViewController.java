package com.my.write.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

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
	public String write() {
		return "write";
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
	 * 게시글 수정&삭제 페이지 이동 http://127.0.0.1:8080/write/update
	 */
	@GetMapping("update")
	public String update() {
		return "update";
	}

	/**
	 * 게시글 수정 페이지 이동 http://127.0.0.1:8080/write/edit
	 */
	@GetMapping("edit")
	public String edit() {
		return "edit";
	}

}
