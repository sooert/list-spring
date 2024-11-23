package com.my.write.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.write.entity.User;

@Repository
public class UserDao {
	@Autowired
	SqlSession s;

	public int save(User user) {
		return s.insert("UserMapper.save", user);
	}

	public User findByCode(String user_code) {
		return s.selectOne("UserMapper.findByCode", user_code);
	}

	public User getById(String id) {
		return s.selectOne("UserMapper.getById", id);
	}

	public User getByNick(String nick) {
		return s.selectOne("UserMapper.getByNick", nick);
	}

	// 로그인 - 아이디/비밀번호로 회원 조회
	public User getByIdAndPw(User user) {
		return s.selectOne("UserMapper.getByIdAndPw", user);
	}
}