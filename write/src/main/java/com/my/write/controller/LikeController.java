package com.my.write.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.write.entity.Like;
import com.my.write.entity.User;
import com.my.write.service.BoardService;
import com.my.write.service.LikeService;
import com.my.write.service.UserService;

@RestController
@RequestMapping(value = "api/like")
public class LikeController {

	@Autowired
	BoardService boardService;

	@Autowired
	UserService userService;

	@Autowired
	LikeService likeService;

	// 좋아요 추가
	@PostMapping("save")
	public String save(
			@RequestParam("user_nick") String user_nick, 
			@RequestParam("board_idx") int board_idx,
			@RequestParam(value = "count", defaultValue = "1") int count,  // count의 기본값 설정
			HttpSession session) {

		try {
			User result = userService.getByNick(user_nick);
			if (result != null) {
				session.setAttribute("me", result);
			}

			Like like = new Like();
			like.setUser_nick(user_nick);
			like.setBoard_idx(board_idx);
			like.setCount(count);
			likeService.save(like);

			return "ok";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}

	// 좋아요 삭제
	@PostMapping("delete")
	public String delete(@RequestParam("user_nick") String user_nick, @RequestParam("board_idx") int board_idx) {
		likeService.deleteLike(board_idx, user_nick);
		return "ok";
	}

	// 좋아요 조회
	@GetMapping("getByBoardIdx")
	public Like getByBoardIdx(@RequestParam("board_idx") int board_idx) {
		return likeService.getByBoardIdx(board_idx);
	}

	// 좋아요 상태 확인
	@GetMapping("checkLikeStatus")
	public boolean checkLikeStatus(@RequestParam("board_idx") int board_idx,
			@RequestParam("user_nick") String user_nick) {
		return likeService.checkLikeStatus(board_idx, user_nick);
	}

}
