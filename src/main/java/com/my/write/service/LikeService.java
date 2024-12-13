package com.my.write.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.write.dao.LikeDao;
import com.my.write.entity.Like;

@Service
public class LikeService {

	@Autowired
	LikeDao likeDao;

	// 좋아요 추가
	public void save(Like like) {
		likeDao.save(like);
	}

	// 좋아요 삭제
	public void deleteLike(int board_idx, String user_nick) {
		likeDao.deleteLike(board_idx, user_nick);
	}

	// 좋아요 조회
	public Like findByBoardIdx(int board_idx) {
		return likeDao.findByBoardIdx(board_idx);
	}

	// 좋아요 상태 확인
	public boolean checkLikeStatus(int board_idx, String user_nick) {
		return likeDao.checkLikeStatus(board_idx, user_nick);
	}

}
