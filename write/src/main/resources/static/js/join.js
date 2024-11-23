// 입력 초기화
function reset() {
    $('#id').val('');
    $('#nick').val('');
    $('#pw').val('')
    $('#pwcheck').val('');

    // 중복체크
    $('#id-result-txt').text('');
    $('#nick-result-txt').text('');
    $('#pw-result-txt').text('');
}

// 비밀번호 타이핑했을때 확인 
function validatePassword(password, passwordCheck) {
    // 첫 번째 비밀번호 입력란일 경우
    if (!passwordCheck) {
        if (!password) return "empty";
        if (password.length < 8) return "short";
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(password)) return "invalid";
        return "ok";
    }
    // 비밀번호 확인란일 경우
    else {
        if (password !== passwordCheck) return "notmatch";
        return "match"; 
    }
}

// 비밀번호 경고 창 표시
var enablePw = false;
function buildResultText(result, isPasswordCheck) {
    const resultText = $('#pw-result-txt');
    
    // 비밀번호 확인란이 아닐 경우
    if (!isPasswordCheck) {
        switch(result) {
            case 'empty':
                resultText.text('비밀번호를 입력해주세요.').css('color','#f01200');
                enablePw = false;
                break;
            case 'short':
                resultText.text('비밀번호는 8자 이상이어야 합니다.').css('color','#f01200');
                enablePw = false;
                break;
            case 'invalid':
                resultText.text('영문/숫자/특수문자를 모두 포함해야 합니다.').css('color','#f01200');
                enablePw = false;
                break;
            case 'ok':
                if ($('#pw').val() === $('#pwcheck').val() && $('#pwcheck').val() !== '') {
                    resultText.text('비밀번호가 일치합니다.').css('color','#006bea');
                    enablePw = true;
                }
                break;
        }
    } else if ($('#pw').val() === $('#pwcheck').val() && $('#pwcheck').val() !== '') {
        resultText.text('비밀번호가 일치합니다.').css('color','#006bea');
        enablePw = true;
    } else {
        resultText.text('비밀번호가 일치하지 않습니다.').css('color','#f01200');
        enablePw = false;
    }
}

$(document).ready(function() {

    
    // 한글 입력 방지
    $('#id, #pw').on('keyup', function(e) {
        var id = $(this).val();
        var pw = $(this).val();

        $(this).val(id.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
        $(this).val(pw.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
    });
    
    // 비밓번호 특수 문자 타이핑 쳤을때 확인
    $('#pw, #pwcheck').on('keyup', function() {
        var pw = $('#pw').val();
        var pwcheck = $('#pwcheck').val();
        var isPasswordCheck = $(this).attr('id') === 'pwcheck';
        
        var result = validatePassword(pw, pwcheck);
        
        if (isPasswordCheck) {
            // 비밀번호 확인란일 경우
            if (pwcheck) {
                if (result === 'match') {
                    $('#pw-result-txt').text('비밀번호가 일치합니다.').css('color','#006bea');
                    enablePw = true;
                } else {
                    $('#pw-result-txt').text('비밀번호가 일치하지 않습니다.').css('color','#f01200');
                }
            }
        }
        
        // 경고창 요청
        buildResultText(result, isPasswordCheck);
    });
    
    // 회원 가입
    $('#signup-btn').on('click', function(e) {
        
        // 기본 폼 제출 동작 방지
        e.preventDefault();

        const userData = {
            id: $('#id').val(),
            nick: $('#nick').val(), 
            pw: $('#pw').val(),
            pwcheck: $('#pwcheck').val(),
        };

        // 백엔드로 요청
        $.ajax({
            url : './api/user/create',
            type :'post',
            data : {
            id: userData.id,
            pw: userData.pw,
            nick: userData.nick,
        },
        success: function(response) {
            if(response == 'ok') {
                alert("회원가입이 완료되었습니다.");
                window.location.href = './index';
            } else if(response == '동일한 id') {
                alert("이미 가입된 아이디가 존재합니다.");
            } else if(response == '동일한 nick') {
                alert("이미 사용중인 닉네임입니다.");
            } 
        },
        error: function(error) {
            console.error('Error:', error);
            alert('서버 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        });

        // 각 필드 유효성 검사
        if (!validateInput(userData.id, '아이디')) {
            return;
        }
        if (!validateInput(userData.pw, '비밀번호')) {
            return;
        }
        if (!validateInput(userData.nick, '닉네임')) {
            return;
        }

        // 비밀번호 일치 여부 체크
        if(userData.pw != userData.pwcheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        
        // 비밀번호 경고창부분에서 일치하지 않는지 체크
        if(enablePw==false) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        
        if (!isIdVerified) {
            alert('아이디 중복 확인이 필요합니다.');
            return;
        }
        
        if (!isNickVerified) {
            alert('닉네임 중복 확인이 필요합니다.');
            return;
        }
        
    
    });

    // 중복 확인 상태를 저장할 변수 추가
    let isIdVerified = false;
    let isNickVerified = false;

    function checkDuplicateId() {
        const id = $('#id').val();
        
        if (!id) {
            alert('아이디를 입력해주세요.');
            return;
        }
        
        $.ajax({
            url: './api/user/getById',
            type: 'get',
            data: { id: id },
            success: function(response) {
                if (!response) {
                    $('#id-result-txt')
                        .text('사용 가능한 아이디입니다.')
                        .css('color', '#006bea');
                    isIdVerified = true;
                } else {
                    $('#id-result-txt')
                        .text('이미 사용중인 아이디입니다.')
                        .css('color', '#f01200');
                    $('#id').val('');
                    isIdVerified = false;
                }
            },
            error: function() {
                alert('서버 오류가 발생했습니다.');
                isIdVerified = false;
            }
        });
    }

    function checkDuplicateNick() {
        const nick = $('#nick').val();
        
        if (!nick) {
            alert('닉네임을 입력해주세요.');
            return;
        }
        
        $.ajax({
            url: './api/user/getByNick',
            type: 'get',
            data: { nick: nick },
            success: function(response) {
                if (!response) {
                    $('#nick-result-txt')
                        .text('사용 가능한 닉네임입니다.')
                        .css('color', '#006bea');
                    isNickVerified = true;
                } else {
                    $('#nick-result-txt')
                        .text('이미 사용중인 닉네임입니다.')
                        .css('color', '#f01200');
                    $('#nick').val('');
                    isNickVerified = false;
                }
            },
            error: function() {
                alert('서버 오류가 발생했습니다.');
                isNickVerified = false;
            }
        });
    }

    // 입력값 유효성 검사 함수 추가
    function validateInput(value, fieldName) {
        if (!value || value.length === 0) {
            alert(`${fieldName}을(를) 입력해주세요.`);
            return false;
        }
        return true;
    }

    // ID 입력 필드 변경 감지
    $('#id').on('input', function() {
        isIdVerified = false;
        $('#id-result-txt').text('중복 확인이 필요합니다.').css('color', 'orange');
    });

    // 닉네임 입력 필드 변경 감지
    $('#nick').on('input', function() {
        isNickVerified = false;
        $('#nick-result-txt').text('중복 확인이 필요합니다.').css('color', 'orange');
    });

    // 아이디 중복확인 버튼 클릭 이벤트
    $('.idcheck').on('click', function() {
        checkDuplicateId();
    });
    
    // 닉네임 중복확인 버튼 클릭 이벤트
    $('.nickcheck').on('click', function() {
        checkDuplicateNick();
    });

    // 엔터키 이벤트 처리 수정
    $('#id').on('keypress', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $('.idcheck').click();
        }
    });

    $('#nick').on('keypress', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $('.nickcheck').click();
        }
    });

    $('#pw, #pwcheck').on('keypress', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            if ($('#id').val() && $('#nick').val() && $('#pw').val() && $('#pwcheck').val()) {
                $('#signup-btn').click();
            } else {
                let nextInput = $(this).parent().next().find('input');
                if (nextInput.length > 0) {
                    nextInput.focus();
                }
            }
        }
    });
});


