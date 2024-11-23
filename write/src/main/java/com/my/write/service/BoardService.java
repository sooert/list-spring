package com.my.write.service;

import java.util.List;

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
	public List<Board> findAll() {
		return boardDao.findAll();
	}

	// 게시글 수정
	public int update(Board board) {
		return boardDao.update(board);
	}

	// 게시글 삭제
	public int delete(int board_idx) {
		return boardDao.delete(board_idx);
	}

	// 게시글 좋아요 추가
	public int addLike(int board_idx, String user_nick) {
		return boardDao.addLike(board_idx, user_nick);
	}

	// 게시글 좋아요 삭제
	public int deleteLike(int board_idx) {
		return boardDao.deleteLike(board_idx);
	}	

	// 유저 찾기
	public Board findById(String user_id) {
		return boardDao.findById(user_id);
	}

	// 닉네임 찾기
	public Board findByNick(String nick) {
		return boardDao.findByNick(nick);
	}

}
