package com.my.write.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.write.entity.Chat;
import com.my.write.entity.User;

@Repository
public class ChatDao {
	@Autowired
	SqlSession s;

	// 채팅 저장
	public void save(Chat chat) {
		s.insert("ChatMapper.save", chat);
	}

	// 댓글 찾기
	public List<Chat> findAll(Map<String, Object> params) {
		return s.selectList("ChatMapper.findAll", params);
	}

	// 댓글 삭제
	public void delete(int chat_idx) {
		s.delete("ChatMapper.delete", chat_idx);
	}

	// 댓글 수정
	public void update(Chat chat) {
		s.update("ChatMapper.update", chat);
	}

	// 댓글 유저 닉네임으로 찾기
	public Chat findByUserNick(String user_nick) {
		return s.selectOne("ChatMapper.findByUserNick", user_nick);
	}

	// 로그인 유저 찾기
	public User getLoginUser(String user_nick) {
		return s.selectOne("ChatMapper.getLoginUser", user_nick);
	}

	// 댓글 좋아요 상태 확인
	public int checkLikeStatus(Map<String, Object> params) {
		return s.selectOne("ChatMapper.checkLikeStatus", params);
	}

	// 댓글 좋아요 추가
	public void addLikeCount(int chat_idx) {
		s.update("ChatMapper.addLikeCount", chat_idx);
	}

	// 댓글 좋아요 삭제
	public void deleteLikeCount(int chat_idx) {
		s.update("ChatMapper.deleteLikeCount", chat_idx);
	}

	// 댓글 좋아요 추가
	public void addLike(Map<String, Object> params) {
		s.insert("ChatMapper.addLike", params);
	}

	// 댓글 좋아요 삭제
	public void deleteLike(Map<String, Object> params) {
		s.delete("ChatMapper.deleteLike", params);
	}

}
