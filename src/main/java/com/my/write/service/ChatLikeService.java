package com.my.write.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.write.dao.ChatLikeDao;
import com.my.write.entity.Chat;

@Service
public class ChatLikeService {

	@Autowired
	ChatLikeDao chatLikeDao;

	// 댓글 좋아요 추가
	public void ChatLike(Chat chat) {
		chatLikeDao.ChatLike(chat);
	}

}
