/* eslint-disable */
//
// IMPORTS
//
// libraries

// app modules
import linkupRadar from './js/radar/linkupRadar'
import showAlert from './js/util/alert'
import { login, logout } from './js/user/login'
import changePassword from './js/user/userSettings'

//
// RADAR MENU BUTTONS EVENT
//
const radarButtons = document.querySelectorAll('.radar')
if (radarButtons) {
    radarButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault()
            const slug = event.target.getAttribute('radar')
            window.location.assign(`/radar/${slug}`)
        })
    })
}

//
// ADMIN MENU BUTTONS EVENT
//
const adminButtons = document.querySelectorAll('.admin')
if (adminButtons) {
    adminButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault()
            const route = event.target.getAttribute('route')
            window.location.assign(``)
        })
    })
}

//
// SHOW RADAR - CLIENT SIDE
//
const radarSection = document.getElementById('radar')
if (radarSection) {
    // 1) Select the root element of the radar section
    const radarRootDOM = d3.select('section#radar')

    // 2) Link up DOM elements with interactive JavaScript
    linkupRadar(radarRootDOM)
}

//
// Login form
//
const loginForm = document.getElementById('login-form')
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const password = document.getElementById('password').value
        login(name, password, document.referrer)
    })
}

//
// Logout
//
const logOutBtn = document.querySelector('.nav__el--logout')
if (logOutBtn) logOutBtn.addEventListener('click', logout)

//
// Change password
//
const passwordForm = document.getElementById('password-form')
if (passwordForm) {
    passwordForm.addEventListener('submit', async e => {
        e.preventDefault()
        document.querySelector('.btn--update-password').textContent = 'Updating...'

        const current = document.getElementById('current').value
        const newPass = document.getElementById('newPass').value
        const newConfirm = document.getElementById('newConfirm').value
        await changePassword(current, newPass, newConfirm)

        document.querySelector('.btn--update-password').textContent = 'Change password'
        document.getElementById('current').textContent = ''
        document.getElementById('newPass').textContent = ''
        document.getElementById('newConfirm').textContent = ''
    })
}

// if (userDataForm)
//     userDataForm.addEventListener('submit', e => {
//         e.preventDefault()
//         const form = new FormData()
//         form.append('name', document.getElementById('name').value)
//         form.append('email', document.getElementById('email').value)
//         form.append('photo', document.getElementById('photo').files[0])

//         updateSettings(form, 'data')
//     })

// if (userPasswordForm)
//     userPasswordForm.addEventListener('submit', async e => {
//         e.preventDefault()
//         document.querySelector('.btn--save-password').textContent = 'Updating...'

//         const passwordCurrent = document.getElementById('password-current').value
//         const password = document.getElementById('password').value
//         const passwordConfirm = document.getElementById('password-confirm').value
//         await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password')

//         document.querySelector('.btn--save-password').textContent = 'Save password'
//         document.getElementById('password-current').value = ''
//         document.getElementById('password').value = ''
//         document.getElementById('password-confirm').value = ''
//     })

// if (bookBtn)
//     bookBtn.addEventListener('click', e => {
//         e.target.textContent = 'Processing...'
//         const { tourId } = e.target.dataset
//         bookTour(tourId)
//     })

// show alerts sent by the server
const alertMsg = document.querySelector('body').dataset.alertmsg
const alertType = document.querySelector('body').dataset.alerttype
if (alertMsg && alertType) showAlert(alertType, alertMsg, 500)
