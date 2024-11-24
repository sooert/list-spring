package com.my.write.controller;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.write.entity.User;
import com.my.write.service.UserService;

@RestController
@RequestMapping(value = "api/user")
public class UserController {

	@Autowired
	UserService userService;

	// 회원 생성
	@PostMapping("create")
	public String create(@RequestParam(value = "id") String id, @RequestParam(value = "pw") String pw,
			@RequestParam(value = "nick") String nick) {
		// 아이디 중복 검사
		if (userService.getById(id) != null) {
			return ("동일한 id");
		}

		// 닉네임 중복 검사
		if (userService.getByNick(nick) != null) {
			return ("동일한 nick");
		}

		// 회원 생성
		User user = new User();
		user.setId(id);
		user.setPw(pw);
		user.setNick(nick);

		String userCode;
		do {
			userCode = RandomStringUtils.randomAlphanumeric(10);
		} while (userService.findByCode(userCode) != null);

		user.setUser_code(userCode);
		userService.save(user);

		return ("ok");
	}

	// 아이디로 회원 찾기
	@GetMapping("getById")
	public User getById(@RequestParam String id) {
		return userService.getById(id);
	}

	// 닉네임으로 회원 찾기
	@GetMapping("getByNick")
	public User getByNick(@RequestParam String nick) {
		return userService.getByNick(nick);
	}

	// 로그인
	@GetMapping("login")
	public User login(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "pw", required = true) String pw, HttpSession session) {

		User user = new User();
		user.setId(id);
		user.setPw(pw);

		User result = userService.getByIdAndPw(user);
		if (result != null) {
			session.setAttribute("me", result);
		}
		return result;
	}

	// 로그아웃
	@PostMapping("logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "ok";
	}

	// 로그인한 사용자 정보 가져오기
	@GetMapping("getLoginUser")
	public User getLoginUser(HttpSession session) {
		return (User) session.getAttribute("me");
	}

}
