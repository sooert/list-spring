package com.my.write.dao;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.write.entity.Like;

@Repository
public class LikeDao {

	@Autowired
	SqlSession s;

	// 좋아요 추가
	public void save(Like like) {
		s.insert("LikeMapper.save", like);
	}

	// 좋아요 조회
	public Like getByBoardIdx(int board_idx) {
		return s.selectOne("LikeMapper.getByBoardIdx", board_idx);
	}

	// 좋아요 상태 확인
	public boolean checkLikeStatus(int board_idx, String user_nick) {
		return s.selectOne("LikeMapper.checkLikeStatus", new HashMap<String, Object>() {{
			put("board_idx", board_idx);
			put("user_nick", user_nick);
		}});
	}

	// 좋아요 삭제
	public void deleteLike(int board_idx, String user_nick) {
		s.delete("LikeMapper.deleteLike", new HashMap<String, Object>() {{
			put("board_idx", board_idx);
			put("user_nick", user_nick);
		}});
	}

}
