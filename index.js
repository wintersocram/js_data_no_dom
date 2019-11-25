var model = {
    firstname: "John",
    lastname: "Doe",
  }
  
  function update(key, val) {
    model[key] = val;
  }
  
  function onInput(e) {
    var input = $(e.target);
    var key = input.attr('name');
    var val = input.val().trim();
    update(key, val);
  }
  
  function onSubmit(e) {
    e.preventDefault();
    $.post('/echo/json/', {json: JSON.stringify(model), delay: 1})
      .done(console.log)
      .fail(console.error);
  }
  
  function createFormRenderer(model, doUpdate, doSubmit, formContainer) {
    formContainer = $(formContainer);
    var init = function() {
      var form = formContainer
        .html([
          '<form id="form">',
            '<input name="firstname" value="' + model.firstname + '">',
            '<input name="lastname" value="' + model.lastname + '">',
            '<button>Save</button>',
            '<textarea>' + JSON.stringify(model) + '</textarea>',
          '</form>',
        ].join(''))
        .find('#form');
      form.on('input', doUpdate);
      form.on('submit', doSubmit);
    }
    var update = function() {
      formContainer.find('input[name="firstname"]').val(model.firstname);
      formContainer.find('input[name="lastname"]').val(model.lastname);
      formContainer.find('textarea').val(JSON.stringify(model));
    }
    var next = init;
    return function() {
      next();
      next = update;
    }
  }
  
  var renderForm = createFormRenderer(
    model, 
    function (e) {
      onInput(e);
      renderForm();
    },
    function (e) {
      onSubmit(e);
      renderForm();
    },
    '#formContainer'
  );
  renderForm();
  