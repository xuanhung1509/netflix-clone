// Create template
const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .form-title {
      padding: 20px 30px 20px 18px;
      font-size: 1.2rem;
      text-align: center;
    }

    .form {
      max-width: 768px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .input-field-container {
      flex: 2;
      width: 100%;
      height: 100%;
    }

    .input-group {
      position: relative;
      border: 1px solid #333;
      border-radius: 1px;
      width: 100%;
      height: 100%;
    }

    .input-group input {
      padding: 30px 10px 18px;
      border: none;
      border-bottom: 2px solid #fff;
      border-radius: 1px;
      width: 100%;
      height: 100%;
      font-size: 16px;
    }

    .input-group input:focus {
      outline: none;
    }

    .input-group input:focus + label,
    .input-group label.on-top {
      font-size: 12px;
      font-weight: bold;
      transform: translateY(-150%);
    }

    .input-group label {
      color: #8c8c8c;
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      transition: all 0.1s ease;
      pointer-events: none;
    }

    .error {
      display: block;
      color: #ffa00a;
      margin-top: 8px;
      font-size: 14px;
      text-align: left;
    }

    .submit {
      cursor: pointer;
      flex: 1;
      padding: 19px;
      background: #e50914;
      color: #fff;
      border: none;
      border-radius: 1px;
      font-size: 28px;
    }

    .submit > i {
      padding-left: 5px;
    }

    .submit:focus {
      outline: none;
    }

    @media screen and (max-width: 1400px) {
      .input-group input {
        padding: 30px 10px 10px;
      }

      .submit {
        padding: 15px;
      }
    }

    @media screen and (max-width: 992px) {
      .form {
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
      }

      .form-title {
        font-size: 18px;
      }

      .submit {
        font-size: 20px;
      }
    }

    @media screen and (max-width: 720px) {
      .form {
        padding: 0 20px;
      }

      .input-group input {
        padding: 20px 10px 5px;
      }

      .input-group label {
        font-size: 14px;
      }

      .input-group input:focus + label,
      .input-group label.on-top {
        font-size: 11px;
      }

      .submit {
        padding: 10px 15px;
        font-size: 16px;
      }
    }

    @media screen and (max-width: 500px) {
      .form-title {
        padding: 0 30px 20px 18px;
      }

      .input-group input {
        padding: 18px 10px 5px;
      }

      .input-group label {
        font-size: 14px;
      }

      .input-group input:focus + label,
      .input-group label.on-top {
        transform: translateY(-140%);
      }

      .submit {
        padding: 10px;
        font-size: 16px;
      }
    }
  </style>

  <p class="form-title">
    Ready to watch? Enter your email to create or restart your
    membership.
  </p>
  <form class="form">
  <div class="input-field-container">
    <div class="input-group">
      <input id="email" type="text" autocomplete="off" />
      <label>Email Address</label>
    </div>
    <small class="error" id="error"></small>
  </div>
  <button class="submit">
    Get Started
    <i class="fa-solid fa-chevron-right"></i>
  </button>
  </form>
`;

// Create custom HTML element
class EmailInput extends HTMLElement {
  // validate email
  validateEmail(email) {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let result = re.test(email.value.trim());
    return result;
  }

  // Show error
  showError(input) {
    const error = input.parentNode.nextElementSibling;
    const validateResult = this.validateEmail(input);

    if (input.value.trim().length < 5) {
      error.textContent = `This field is required`;
      input.style.borderBottom = '2px solid #ffa00a';
    } else if (input.value.trim().length >= 5 && !validateResult) {
      error.textContent = 'Please enter a valid email address';
      input.style.borderBottom = '2px solid #ffa00a';
    } else {
      error.textContent = '';
      input.style.borderBottom = '2px solid #fff';
    }
  }

  // Handle label position
  handleLabel(input) {
    const label = input.nextElementSibling;

    if (input.value.trim().length > 0) {
      label.classList.add('on-top');
    } else {
      label.classList.remove('on-top');
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const email = this.shadowRoot.getElementById('email');
    email.addEventListener('input', () => this.showError(email));
    email.addEventListener('blur', () => this.handleLabel(email));
  }

  disconnectedCallback() {
    const email = this.shadowRoot.getElementById('email');
    email.addEventListener('input', () => this.showError(email));
    email.addEventListener('blur', () => this.handleLabel(email));
  }
}

// Link custom element with custom HTML tag
customElements.define('email-input', EmailInput);
