package com.my.write.service;

import java.util.HashMap;
import java.util.List;	
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.write.dao.UserDao;
import com.my.write.entity.User;

@Service
public class UserService {

	@Autowired
	UserDao userDao;

	// 유저 저장	
	public int save(User user) {
		return userDao.save(user);
	}

	// 유저 코드 찾기	
	public User findByCode(String user_code) {
		return userDao.findByCode(user_code);
	}

	// 아이디 찾기	
	public User findById(String id) {
		return userDao.findById(id);
	}

	// 닉네임 찾기
	public User findByNick(String nick) {
		return userDao.findByNick(nick);
	}

    // 유저 검색
	public User findByIdAndPw(User user) {
		return userDao.findByIdAndPw(user);
	}

	// 유저 수정
	public int update(User user) {
		return userDao.update(user);
	}

	// 유저 idx로 찾기
	public User findByIdx(int user_idx) {
		return userDao.findByIdx(user_idx);
	}

	// 유저 전체 찾기
	public List<User> findAll() {
		return userDao.findAll();
	}	

	// 유저 전체 찾기
	public List<User> findAll(HashMap<String, Object> map) {
		return userDao.findAll(map);
	}

	// 유저 탈퇴
	public int delete(String user_code) {
		return userDao.delete(user_code);
	}
}
