import React, { useCallback, useState } from "react";

export default function Login({ onSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmit({ email, password });
    }, [email, password, onSubmit])
    return (
        <form className={"auth__form"} onSubmit={handleSubmit} action="#" name={"auth__form"}
            onClick={e => e.stopPropagation()}>{/*чтобы не закрывалось при клике на саму форму*/}
            <h2 className="auth__title">Вход</h2>
            <input
                required id={"email"}
                name="email"
                type="email"
                className="auth__input"
                placeholder={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete={"on"}
            >
            </input>
            <input
                required id={"password"}
                name={"password"}
                type={"password"}
                className={"auth__input"}
                placeholder={"Пароль"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={"on"}
            >
            </input>
            <button type="submit" className="auth__btn">Войти</button>
        </form>
    )
}
