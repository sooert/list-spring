package com.my.write.service;

import java.util.List;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.write.dao.BoardDao;
import com.my.write.entity.Board;

@Service
public class BoardService {

	@Autowired
	BoardDao boardDao;
 
	// 게시글 추가
	public int save(Board board) {
		return boardDao.save(board);
	}

	// 게시글 번호 찾기
	public Board findByIdx(int board_idx) {
		return boardDao.findByIdx(board_idx);
	}

	// 전체 게시글 찾기
	public List<Board> findAll(HashMap<String, Object> params) {
		return boardDao.findAll(params);
	}

	// 게시글 수정
	public void update(Board board) {
		boardDao.update(board);
	}

	// 게시글 삭제
	public int delete(int board_idx) {
		return boardDao.delete(board_idx);
	}

	// 유저 찾기
	public Board findById(String user_id) {
		return boardDao.findById(user_id);
	}

	// 닉네임 찾기
	public Board findByNick(String nick) {
		return boardDao.findByNick(nick);
	}

	// 조회수 증가
	public void increaseViewCount(int board_idx) {
		boardDao.increaseViewCount(board_idx);
	}

	// 게시글 총 개수
	public int totalCount(String category) {
		return boardDao.totalCount(category);
	}

	// 검색 기능
	public List<Board> searchPosts(HashMap<String, Object> params) {
		return boardDao.searchPosts(params);
	}
}
