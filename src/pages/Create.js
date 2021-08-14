import React, { useState, useRef } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core';

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
// Module CSS
import mystyles from './Create.module.css'

// ICONS
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';

// HOOK
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    btn: {

        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 25,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        '&:hover': {
            background: 'linear-gradient(-45deg, #FE6B8B 30%, #FF8E53 90%)'

        }
    },
    inp: {
        width: '70%'
    },
    setPos1: {
        transform: 'rotate(0deg)',
        transition: 'all .2s ease-out'
    },
    setPos2: {
        transform: 'rotate(30deg)',
        transition: 'all .2s ease-out'
    }
})

// fake data
let id = 0



// ----------------------------------------------HOBOCalc---------------------------------------------- //

const Create = () => {
    const classes = useStyles()

    const [showSettings, setShowSettings] = useState(false)
    const [units, setUnits] = useState('Kg')
    const [currency, setCurrency] = useState('$')
    const [itemList, setItemList] = useState([])

    const [errPrice, setErrPrice] = useState(false)
    const [errAmount, setErrAmount] = useState(false)

    const productR = useRef()
    const priceR = useRef()
    const amountR = useRef()

    const onPressSettings = () => {
        setShowSettings(prevstate => !prevstate)
    }

    const onChooseCurrency = event => {
        setCurrency(event.target.value)
    }

    const onChooseUnits = event => {
        setUnits(event.target.value)
    }


    const onAddProduct = () => {

        if (!priceR.current.value && !amountR.current.value) {
            setErrPrice(true)
            setErrAmount(true)
            return
        }

        if (!priceR.current.value) {
            setErrPrice(true)
            return
        }

        if (!amountR.current.value) {
            setErrAmount(true)
            return
        }


        id += 1
        let actualPrice = '' + (+priceR.current.value / +amountR.current.value)
        actualPrice = actualPrice.slice(0, actualPrice.indexOf('.') + 3)
        const item = {
            id: id,
            name: productR.current.value || 'Some item',
            price: priceR.current.value,
            amount: amountR.current.value,
            line: `${priceR.current.value}${currency} / ${amountR.current.value}${units} = ${actualPrice}${currency} per 1${units}`
        }

        // clean up the form
        productR.current.value = ''
        priceR.current.value = ''
        amountR.current.value = ''

        setItemList([...itemList, item])
    }


    const delItem = id => {
        let filtered = itemList.filter(el => el.id !== id)
        setItemList(filtered)
    }

    const reset = () => {
        productR.current.value = ''
        priceR.current.value = ''
        amountR.current.value = ''
        setErrPrice(false)
        setErrAmount(false)
        setItemList([])
    }

    return (
        <>
            <Typography variant="h4" style={{ borderBottom: '2px solid grey', marginTop: '20px', marginBottom: '10px' }}>
                HoboCalc v4.0.1
            </Typography>

            {/* ------------- INPUT FEILD ------------- */}

            <div className={mystyles.inputDiv}>
                <Typography variant="h6" color='primary'>
                    Product
                </Typography>

                <TextField
                    inputRef={productR}
                    type='text'
                    className={classes.inp}
                    color='primary'
                    variant='outlined'
                    placeholder='product'
                    margin='dense'
                />
            </div>

            <div className={mystyles.inputDiv}>
                <Typography variant="h6" color='primary'>
                    Price/{currency}
                </Typography>

                <TextField
                    inputRef={priceR}
                    type='number'
                    className={classes.inp}
                    color='primary'
                    variant='outlined'
                    placeholder={`price/${currency}*`}
                    margin='dense'
                    error={errPrice}
                    onChange={() => setErrPrice(false)}
                />
            </div>

            <div className={mystyles.inputDiv}>
                <Typography variant="h6" color='primary' noWrap>
                    Amount/{units}
                </Typography>

                <TextField
                    inputRef={amountR}
                    type='number'
                    className={classes.inp}
                    color='primary'
                    variant='outlined'
                    placeholder={`amount/${units}*`}
                    margin='dense'
                    error={errAmount}
                    onChange={() => setErrAmount(false)}
                />
            </div>

            <br />
            <br />

            {/* ------------- BUTTONS FEILD ------------- */}

            <div className={mystyles.inputDiv}>

                <Button
                    style={{ minWidth: '30%' }}
                    className={classes.btn}
                    color='primary'
                    variant='contained'
                    onClick={reset}
                >
                    RESET
                </Button>


                <SettingsIcon
                    className={showSettings ? classes.setPos2 : classes.setPos1}
                    color='primary'
                    fontSize="large"
                    onClick={onPressSettings}
                    style={{ cursor: 'pointer' }}
                />


                <Button
                    style={{ minWidth: '30%' }}
                    className={classes.btn}
                    color='primary'
                    variant='contained'
                    onClick={onAddProduct}
                >
                    ADD
                </Button>
            </div>
            {/* -------------------------------------SETTINGS------------------------------------- */}
            {showSettings &&
                <>
                    <div className={`${mystyles.inputDiv} ${mystyles.settingsDiv}`}>
                        <FormControl variant="outlined" style={{ width: '40%' }} color="primary">
                            <InputLabel id="demo-simple-select-outlined-label" style={{ color: 'black', fontWeight: '700' }}>Currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={currency}
                                onChange={onChooseCurrency}
                                label="currency"
                            >
                                <MenuItem value={'$'}>Dollar $</MenuItem>
                                <MenuItem value={'₴'}>Hryvna ₴</MenuItem>
                                <MenuItem value={'€'}>Euro €</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '40%' }}>
                            <InputLabel id="units-label" style={{ color: 'black', fontWeight: '700' }}>Units</InputLabel>
                            <Select
                                labelId="units-label"
                                id="units"
                                value={units}
                                onChange={onChooseUnits}
                                label="units"
                            >
                                <MenuItem value={'Kg'}>Kilograms</MenuItem>
                                <MenuItem value={'lb'}>Pounds</MenuItem>
                                <MenuItem value={'L'}>Liters</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </>
            }

            <br />

            {/* - ---------------------------------OUTPUT ---------------------------------- */}

            {itemList.length >= 1
                ? itemList.map(el => (
                    <div key={el.id} className={mystyles.outputDiv}>
                        <div className={mystyles.itemDiv}>
                            <Typography variant="h6" color='primary' noWrap style={{ color: 'Black' }}>
                                {el.name}
                            </Typography>
                        </div>
                        <div className={mystyles.inputDiv} style={{ paddingRight: '5px', paddingBottom: '5px', paddingLeft: '15px' }}>
                            <Typography variant="h6" color='secondary' style={{ fontSize: '1rem' }}>
                                {el.line}
                            </Typography>

                            <Button
                                color="primary"
                                variant='contained'
                                onClick={() => delItem(el.id)}
                            >
                                <DeleteIcon />
                            </Button>
                        </div>
                    </div>
                ))
                : <div className={mystyles.description}>
                    <p>
                        Well, the HoboCalc have evolved a bit. This time it is empowered by Material UI. And at the moment I am NOT convinced by all this "material stuff"... May be I just have to learn it a bit more. For now I've done 305 lines of code to show just this..

                    </p>
                </div>
            }
        </>
    )
}

export default Create
// let's make a comment about we need a new branch