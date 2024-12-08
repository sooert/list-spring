package com.my.write.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.write.entity.Chat;
import com.my.write.entity.User;
import com.my.write.service.BoardService;
import com.my.write.service.ChatService;
import com.my.write.service.UserService;

@RestController
@RequestMapping(value = "api/chat")
public class ChatController {

	@Autowired
	UserService userService;

	@Autowired
	BoardService boardService;

	@Autowired
	ChatService chatService;

	@PostMapping("save")
	public String save(
			@RequestParam(value = "board_idx") int board_idx, 
			@RequestParam(value = "chat") String chatText,
			HttpSession session) {

		// 로그인 여부 확인
		User me = (User) session.getAttribute("me");
		if (me == null) {
			return "로그인이 필요합니다";
		}

		// 채팅 객체 생성 및 설정
		Chat chat = new Chat();
		chat.setBoard_idx(board_idx);
		chat.setUser_nick(me.getNick());
		chat.setChat(chatText);

		chatService.save(chat);
		return "ok";
	}

	// 댓글 찾기
	@GetMapping("findAll")
	public List<Chat> findAll(
			@RequestParam(value = "board_idx") int board_idx,
			HttpSession session) {
		// 로그인하지 않은 사용자도 댓글을 볼 수 있도록 수정
		User me = (User) session.getAttribute("me");
		String userNick = me != null ? me.getNick() : null;
		
		Map<String, Object> params = new HashMap<>();
		params.put("board_idx", board_idx);
		params.put("user_nick", userNick);

		return chatService.findAll(params);
	}

	// 댓글 삭제
	@PostMapping("delete")
	public String delete(@RequestParam(value = "chat_idx") int chat_idx) {
		chatService.delete(chat_idx);
		return "ok";
	}

	// 댓글 수정
	@PostMapping("update")
	public String update(@RequestParam(value = "chat_idx") int chat_idx,
			@RequestParam(value = "chat") String chatText) {
		chatService.update(chat_idx, chatText);
		return "ok";
	}

	// 댓글 유저 닉네임으로 찾기
	@GetMapping("findByUserNick")
	public Chat findByUserNick(@RequestParam(value = "user_nick") String user_nick) {
		return chatService.findByUserNick(user_nick);
	}

	// 로그인 유저 찾기
	@GetMapping("getLoginUser")
	public User getLoginUser(HttpSession session) {
		return (User) session.getAttribute("me");
	}

	// 댓글 좋아요 추가
	@PostMapping("addLikeCount")
	public String addLikeCount(@RequestParam(value = "chat_idx") int chat_idx) {
		chatService.addLikeCount(chat_idx);
		return "ok";
	}

	// 댓글 좋아요 삭제
	@PostMapping("deleteLikeCount")
	public String deleteLikeCount(@RequestParam(value = "chat_idx") int chat_idx) {
		chatService.deleteLikeCount(chat_idx);
		return "ok";
	}

	// 댓글 좋아요 상태 확인
	@PostMapping("checkLikeStatus")
	public int checkLikeStatus(@RequestParam(value = "chat_idx") int chat_idx, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null)
			return 0;

		Map<String, Object> params = new HashMap<>();
		params.put("chat_idx", chat_idx);
		params.put("user_nick", me.getNick());
		return chatService.checkLikeStatus(params);
	}

	// 댓글 좋아요 추가
	@PostMapping("addLike")
	public String addLike(@RequestParam(value = "chat_idx") int chat_idx, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null)
			return "로그인이 필요합니다";

		Map<String, Object> params = new HashMap<>();
		params.put("chat_idx", chat_idx);
		params.put("user_nick", me.getNick());
		
		// 좋아요 추가 및 카운트 증가
		chatService.addLike(params);
		chatService.addLikeCount(chat_idx);
		return "ok";
	}

	// 댓글 좋아요 삭제
	@PostMapping("deleteLike")
	public String deleteLike(@RequestParam(value = "chat_idx") int chat_idx, HttpSession session) {
		User me = (User) session.getAttribute("me");
		if (me == null)
			return "로그인이 필요합니다";

		Map<String, Object> params = new HashMap<>();
		params.put("chat_idx", chat_idx);
		params.put("user_nick", me.getNick());
		
		// 좋아요 상태 확인 후 삭제
		int likeExists = chatService.checkLikeStatus(params);
		if (likeExists > 0) {
			chatService.deleteLike(params);
			chatService.deleteLikeCount(chat_idx);
		}
		
		return "ok";
	}

}
