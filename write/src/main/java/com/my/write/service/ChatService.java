package com.my.write.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.write.dao.ChatDao;
import com.my.write.entity.Chat;
import com.my.write.entity.User;

@Service
public class ChatService {

	@Autowired
	ChatDao chatDao;

	// 채팅 저장
	public void save(Chat chat) {
		chatDao.save(chat);
	}

	// 댓글 찾기
	public List<Chat> findAll(int board_idx) {
		return chatDao.findAll(board_idx);
	}

	// 댓글 삭제
	public void delete(int chat_idx) {
		chatDao.delete(chat_idx);
	}

	// 댓글 수정
	public void update(int chat_idx, String chatText) {
		Chat chat = new Chat();
		chat.setChat_idx(chat_idx);
		chat.setChat(chatText);
		chatDao.update(chat);
	}

	// 댓글 유저 닉네임으로 찾기
	public Chat findByUserNick(String user_nick) {
		return chatDao.findByUserNick(user_nick);
	}

	// 로그인 유저 찾기
	public User getLoginUser(String user_nick) {
		return chatDao.getLoginUser(user_nick);
	}

	// 댓글 좋아요 상태 확인
	public int checkLikeStatus(Map<String, Object> params) {
		return chatDao.checkLikeStatus(params);
	}

	// 댓글 좋아요 추가
	public void addLikeCount(int chat_idx) {
		chatDao.addLikeCount(chat_idx);
	}

	// 댓글 좋아요 삭제
	public void deleteLikeCount(int chat_idx) {
		chatDao.deleteLikeCount(chat_idx);
	}

	// 댓글 좋아요 추가
	public void addLike(Map<String, Object> params) {
		chatDao.addLike(params);
	}

	// 댓글 좋아요 삭제
	public void deleteLike(Map<String, Object> params) {
		chatDao.deleteLike(params);
	}

}
