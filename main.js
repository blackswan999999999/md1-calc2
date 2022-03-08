const calculator = document.getElementById('calculator');
const display = document.getElementById('inputNum');


//sử dụng event delegation
//addEventListener cho node cha của các buttons
calculator.addEventListener('click', function(evt) {
    if (evt.target.matches('button')) {
        const btn = evt.target;
        const action = btn.dataset.action;
        const btnContent = btn.innerText;
        const displayNum = display.innerText;

        //check nút nhấn có phải nút phép tính hay không
        //nếu không phải là nút phép tính -> lưu data là số
        if (!action) {
            console.log('number');
            if (displayNum === '0' ||
                calculator.dataset.previousBtn === 'operator' ||
                calculator.dataset.previousBtn === 'equal'
            ) {
                display.innerText = btnContent;
            } else {
                display.innerText = displayNum + btnContent;
            }
            //lưu data cho nút vừa nhấn để check giá trị
            calculator.dataset.previousBtn = 'number';
        }

        //nếu là nút phép tính
        if (action === 'add' ||
            action === 'sub' ||
            action === 'mul' ||
            action === 'div') {
            console.log('operator');
            //khai báo tham số
            const firstNum = calculator.dataset.firstNum;
            const operator = calculator.dataset.operator;
            const secondNum = displayNum;
            //chỉ check firstNum vì luôn tồn tại secondNum = displayNum
            //check previousBtn có là action không
            if (firstNum && operator &&
                calculator.dataset.previousBtn !== 'operator' &&
                calculator.dataset.previousBtn !== 'equal'
            ) {
                const calcNum = cal(firstNum, operator, secondNum);
                display.innerText = calcNum;

                //lưu số vừa tính ra thành firstNum
                //nếu không có bước này
                //khi nhập số mới thì displayNum thay đổi
                //nhưng firstNum, operator và secondNum không đổi
                //=> sinh ra lỗi cho lần tính tiếp theo
                calculator.dataset.firstNum = calcNum;
            } else {
                //nếu không thực hiện phép tính
                //lưu displayNum vào firstNum
                calculator.dataset.firstNum = displayNum;
            }

            calculator.dataset.previousBtn = 'operator';
            calculator.dataset.operator = action;
        }


        //nếu nhấn '.' -> check đã có dấu . hay chưa
        if (action === 'decimal') {
            if (!displayNum.includes('.')) {
                display.innerText = displayNum + '.';
            } else {
                display.innerText = displayNum;
            }
            //nếu nhấn '.' mà trước đó nhấn phím tính toán
            if (calculator.dataset.previousBtn === 'operator' ||
                calculator.dataset.previousBtn === 'equal') {
                display.innerText = '0.'
            }
            calculator.dataset.previousBtn = 'decimal';
        }

        //allclear
        if (action === 'allclear') {
            if (btn.innerText === 'AC') {
                calculator.dataset.firstNum = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousBtn = '';
                calculator.dataset.modNum = '';
            }
            console.log('allclear');
            display.innerText = '0';
            calculator.dataset.previousBtn = 'allclear';
        }

        //nếu nhấn =
        if (action === 'equal') {
            console.log('equal');
            let firstNum = calculator.dataset.firstNum;
            const operator = calculator.dataset.operator;
            let secondNum = displayNum;

            //nếu nhấn "số + ="
            if (firstNum) {
                if (calculator.dataset.previousBtn === 'equal') {
                    //gán firstNum thành displayNum
                    //vì trước đó secondNum = displayNum
                    //nếu không có bước này thì firstNum và operator không đổi
                    //=> lỗi phép tính khi nhấn dấu = lần tiếp theo
                    firstNum = displayNum;
                    //gán secondNum = dữ liệu đã lưu
                    //có thể nhấn = tiếp, vẫn có phép tính theo hàm
                    secondNum = calculator.dataset.modNum;
                }
                display.innerText = cal(firstNum, operator, secondNum)
            }
            //lưu dữ liệu cho secondNum
            calculator.dataset.modNum = secondNum;
            calculator.dataset.previousBtn = 'equal';
        }
    }
});

function cal(firstNum, operator, secondNum) {
    switch (operator) {
        case 'add':
            return parseFloat(firstNum) + parseFloat(secondNum);
            break;
        case 'sub':
            return parseFloat(firstNum) - parseFloat(secondNum);
            break;
        case 'mul':
            return parseFloat(firstNum) * parseFloat(secondNum);
            break;
        case 'div':
            return parseFloat(firstNum) / parseFloat(secondNum);
    }
}