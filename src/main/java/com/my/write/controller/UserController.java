package com.my.write.controller;

import java.util.HashMap;
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
			@RequestParam(value = "nick") String nick, @RequestParam(value = "address") String address,
			@RequestParam(value = "birth_date") String birth_date) {
		try {
			// 필수 파라미터 검증
			if (id == null || pw == null || nick == null || address == null || birth_date == null) {
				return "필수 정보가 누락되었습니다";
			}

			// 아이디 중복 검사
			if (userService.findById(id) != null) {
				return "동일한 id";
			}

			// 닉네임 중복 검사
			if (userService.findByNick(nick) != null) {
				return "동일한 nick";
			}

			// 회원 생성
			User user = new User();
			user.setId(id);
			user.setPw(pw);
			user.setNick(nick);
			user.setAddress(address);
			user.setBirth_date(birth_date);

			String userCode;
			do {
				userCode = RandomStringUtils.randomAlphanumeric(10);
			} while (userService.findByCode(userCode) != null);

			user.setUser_code(userCode);
			userService.save(user);

			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "서버 오류가 발생했습니다: " + e.getMessage();
		}
	}

	// 아이디로 회원 찾기
	@PostMapping("findById")
	public User findById(@RequestParam String id) {
		return userService.findById(id);
	}

	// 닉네임으로 회원 찾기
	@PostMapping("findByNick")
	public User findByNick(@RequestParam String nick) {
		return userService.findByNick(nick);
	}

	// 로그인
	@PostMapping("login")
	public User login(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "pw", required = true) String pw, HttpSession session) {

		User user = new User();
		user.setId(id);
		user.setPw(pw);

		User result = userService.findByIdAndPw(user);
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
	@PostMapping("findByCode")
	public User findByCode(@RequestParam(value = "user_code") String user_code, HttpSession session) {
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
	public String update(@RequestParam(value = "user_code") String user_code, @RequestParam(value = "nick") String nick,
			@RequestParam(value = "address") String address, @RequestParam(value = "birth_date") String birth_date,
			HttpSession session) {

		User user = userService.findByCode(user_code);
		user.setNick(nick);
		user.setAddress(address);
		user.setBirth_date(birth_date);
		userService.update(user);

		// 세션의 사용자 정보도 업데이트
		session.setAttribute("me", user);
		return "ok";
	}

	// 유저 회원 탈퇴
	@PostMapping("delete")
	public String delete(@RequestParam(value = "user_code") String user_code, HttpSession session) {
		userService.delete(user_code);
		session.invalidate();
		return "ok";
	}

	// 유저 idx로 찾기
	@PostMapping("findByIdx")
	public User findByIdx(@RequestParam(value = "user_idx") int user_idx) {
		return userService.findByIdx(user_idx);
	}

	// 유저 전체 찾기
	@PostMapping("findAll")
	public List<User> findAll() {
		return userService.findAll();
	}

	// 유저 전체 찾기 (페이지네이션)
	@PostMapping("findAllByPage")
	public List<User> findAllByPage(@RequestParam(value = "start") int start,
			@RequestParam(value = "count") int count) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("start", start);
		map.put("count", count);
		return userService.findAll(map);
	}

}
