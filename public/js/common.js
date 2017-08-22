$(document).on('submit', '#add-new-book-form', function (e) {
    e.preventDefault();
    var vaildFields = [
        {field: 'book_name', message: '请填写图书名称'},
        {field: 'book_author', message: '请填写图书作者'},
        {field: 'book_isbn', message: '请填写图书编号'},
        {field: 'book_cate', message: '请选择图书分类'}
    ],that = this;
    vaildFields.forEach(function (item) {
        if (!that[item.field].value.trim()) {
            $(that[item.field]).parent().next().find('.error-tips').html(item.message);
            $(that[item.field]).parents('.form-group').addClass('has-error')
        }
    });
    that.submit();
}).on('click', '#book-cover-handler', function (e) {
    $('input[name="book_cover"]').trigger('click')
});