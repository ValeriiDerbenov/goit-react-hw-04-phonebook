import styled from 'styled-components';

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;

  label {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
  }
  input {
    height: 30px;
    border-radius: 6px;
    font-size: 18px;
  }
`;
export const Button = styled.button`
  background-color: #535eaa;
  color: white;
  height: 36px;
  margin-block: 20px;
  border-radius: 6px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #2eee0c;
  }
`;
