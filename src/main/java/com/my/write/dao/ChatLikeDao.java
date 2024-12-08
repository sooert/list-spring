package com.my.write.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.write.entity.Chat;

@Repository
public class ChatLikeDao {
	@Autowired
	SqlSession s;

	// 댓글 좋아요 수정
	public void ChatLike(Chat chat) {
		s.insert("ChatMapper.ChatLike", chat);
	}

}
