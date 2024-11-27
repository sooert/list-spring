package com.my.write.controller;

import java.util.List;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.write.entity.User;
import com.my.write.service.BoardService;
import com.my.write.service.UserService;

@RestController
@RequestMapping(value = "api/user")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	BoardService boardService;

	// 회원 생성
	@PostMapping("create")
	public String create(@RequestParam(value = "id") String id, @RequestParam(value = "pw") String pw,
			@RequestParam(value = "nick") String nick, @RequestParam(value = "address") String address) {
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
		user.setAddress(address);
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

	// 유저 코드 찾기
	@GetMapping("findByCode")
	public User findByCode(@RequestParam(value = "user_code") String user_code, 
							HttpSession	session) {
		if (user_code == null || user_code.equals("null")) {
			return null;
		}
		User user = userService.findByCode(user_code);
		if (user != null) {
			session.setAttribute("me", user);
		}
		return user;
	}

	// 유저 수정
	@PostMapping("update")
	public String update(@RequestParam(value = "user_code") String user_code, 
						@RequestParam(value = "nick") String nick, 
						@RequestParam(value = "address") String address, 
						HttpSession session) {

		User user = userService.findByCode(user_code);
		user.setNick(nick);
		user.setAddress(address);
		userService.update(user);
		
		// 세션의 사용자 정보도 업데이트
		session.setAttribute("me", user);
		return "ok";
	}

	// 유저 idx로 찾기
	@GetMapping("findByIdx")
	public User findByIdx(@RequestParam(value = "user_idx") int user_idx) {
		return userService.findByIdx(user_idx);
	}
	
	// 유저 전체 찾기
	@GetMapping("findAll")
	public List<User> findAll() {
		return userService.findAll();
	}
}
