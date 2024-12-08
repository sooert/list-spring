$(document).ready(function() {

    // 유저 전체 찾기
    $('#find-all-btn').on('click', function() {
        var con = confirm('유저 전체 찾기를 진행하시겠습니까?');
        if(!con) return;
        location.href = `./user/findAll`;
    });
});