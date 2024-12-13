package com.my.write.dao;
	
import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;	

import com.my.write.entity.User;

@Repository
public class UserDao {
	@Autowired
	SqlSession s;

	// 유저 저장
	public int save(User user) {
		return s.insert("UserMapper.save", user);
	}

	// 유저 코드 찾기
	public User findByCode(String user_code) {
		return s.selectOne("UserMapper.findByCode", user_code);
	}

	// 아이디 찾기
	public User findById(String id) {
		return s.selectOne("UserMapper.findById", id);
	}

	// 닉네임 찾기
	public User findByNick(String nick) {
		return s.selectOne("UserMapper.findByNick", nick);
	}

	// 로그인 - 아이디/비밀번호로 회원 조회
	public User findByIdAndPw(User user) {
		return s.selectOne("UserMapper.findByIdAndPw", user);
	}
	// 유저 수정
	public int update(User user) {
		return s.update("UserMapper.update", user);
	}

	// 유저 idx로 찾기
	public User findByIdx(int user_idx) {
		return s.selectOne("UserMapper.findByIdx", user_idx);
	}	

	// 유저 전체 찾기
	public List<User> findAll() {
		return s.selectList("UserMapper.findAll");
	}	

	// 유저 전체 찾기
	public List<User> findAll(HashMap<String, Object> map) {
		return s.selectList("UserMapper.findAll", map);
	}		

	// 유저 탈퇴
	public int delete(String user_code) {
		return s.delete("UserMapper.delete", user_code);
	}
}