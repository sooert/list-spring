package com.my.write.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.my.write.entity.Admin;
import com.my.write.service.AdminService;
import com.my.write.service.UserService;
import com.my.write.service.BoardService;
import com.my.write.service.ChatService;
import com.my.write.service.LikeService;
@RestController
@RequestMapping(value = "api/admin")
public class AdminController {

	@Autowired
	AdminService adminService;

	@Autowired
	BoardService boardService;

    @Autowired
    ChatService chatService;

	@Autowired
	UserService userService;

	@Autowired
	LikeService likeService;	

	// admin 유저 저장 - 추후 생성 예정
	@PostMapping("save")
	public String save(@RequestParam(value = "id") String id, 
						@RequestParam(value = "pw") String pw, 
						@RequestParam(value = "nick") String nick ) {
                            
		// admin 생성
		Admin admin = new Admin();
		admin.setId(id);
		admin.setPw(pw);
		admin.setNick(nick);

		adminService.save(admin);

		return "ok";
    }

	// // 유저 전체 찾기
	// @GetMapping("findByAll")
	// public List<User> findByAll() {
	// 	return userService.findByAll();
	// }

	// 유저 삭제(강제)
	@PostMapping("delete")
	public String delete(@RequestParam(value = "user_idx") int user_idx) {
		return "admin";
	}
	
	// 로그인 찾기
	@GetMapping("login")
	public String login(@RequestParam(value = "id") String id, 
						@RequestParam(value = "pw") String pw) {
		return "admin";
	}
}	
