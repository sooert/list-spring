package com.my.write.dao;

import java.util.List;
import java.util.HashMap;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.write.entity.Board;

@Repository
public class BoardDao {
 
	@Autowired
	SqlSession s;

	// 게시글 추가
	public int save(Board board) {
		return s.insert("BoardMapper.save", board);
	}

	// 게시글 번호 찾기
	public Board findByIdx(int board_idx) {
		return s.selectOne("BoardMapper.findByIdx", board_idx);
	}

	// 전체 게시글 찾기
	public List<Board> findAll(HashMap<String, Object> params) {
		return s.selectList("BoardMapper.findAll", params);
	}

	// 게시글 수정
	public void update(Board board) {
		s.update("BoardMapper.update", board);
	}

	// 게시글 삭제
	public int delete(int board_idx) {
		return s.delete("BoardMapper.delete", board_idx);
	}

	// 유저 찾기
	public Board findById(String user_id) {
		return s.selectOne("BoardMapper.findById", user_id);
	}

	// 닉네임 찾기
	public Board findByNick(String nick) {
		return s.selectOne("BoardMapper.findByNick", nick);
	}

	// 조회수 증가
	public void increaseViewCount(int board_idx) {
		s.update("BoardMapper.increaseViewCount", board_idx);
	}

	// 게시글 총 개수
	public int totalCount(String category) {
		return s.selectOne("BoardMapper.totalCount", category);
	}

}
