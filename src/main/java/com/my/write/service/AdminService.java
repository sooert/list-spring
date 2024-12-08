package com.my.write.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.write.dao.AdminDao;
import com.my.write.entity.Admin;

@Service
public class AdminService {

	@Autowired
	AdminDao adminDao;

	// admin 유저 저장
	public void save(Admin admin) {
		adminDao.save(admin);
	}

}
