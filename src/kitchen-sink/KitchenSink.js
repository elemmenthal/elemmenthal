import React from 'react'

import InternalLink from '../elemental-router2/containers/InternalLink'
import LanguageLink from '../containers/LanguageLink.js'
import AppSettings from '../containers/AppSettings.js'
import ApiLink from '../containers/ApiLink.js'
import FetchLink from '../elemental-fetch/components/FetchLink.js'

import {Translate} from 'react-i18nify'

import { TextInput, Span, ColorPicker } from '../elemental-bindable'

import TestRouter from '../containers/TestRouter.js'

import ElementalTools from '../elemental-dev-tools/ElementalTools.js'

import ProjectListContainer from '../elemental-dev-tools/components/ProjectList.js'

import TestI18n from '../test-i18n'

import TranslationEditor from '../translation-editor'

import './KitchenSink.css'

const KitchenSink = () => (
    <div className="kitchen-sink">

        <ElementalTools />

        <h1><Span bind="pippo.pluto"/></h1>
        <TestRouter/>


        <InternalLink route="homePage">HOME </InternalLink><br/>
        <InternalLink route="allUsers" params={{ id: 123 }}> USERS </InternalLink><br/>
        <InternalLink route="userResource" params={{ id: 123, resId: 666 }}> USER RES </InternalLink><br/>
        <InternalLink route="pippo"><Translate value="application.title"/> </InternalLink><br/>
        <br/>
        <InternalLink route="homePage" searchParams={{ _settings: 'fetch' }}>Fetch settings </InternalLink><br/>
        <InternalLink route="homePage" searchParams={{ _settings: 'i18n' }}>I18n settings </InternalLink><br/>
        <InternalLink route="homePage" searchParams={{ _settings: 'router' }}>Router settings </InternalLink><br/>

        <br/>

        <LanguageLink code="en">Set EN</LanguageLink><br/>
        <LanguageLink code="nl">Set NL</LanguageLink><br/>
        <LanguageLink code="it">Set IT</LanguageLink><br/>
        <TestI18n/>

        <br/>

        <InternalLink href="/users/66/resources/88?filter=all">All Users (Internal HREF link) </InternalLink><br/>


        <ApiLink>CALL API</ApiLink><br/>
        <FetchLink call="getProjects">GET PROJECTS</FetchLink><br/>
        <FetchLink call="postProject">POST PROJECT</FetchLink><br/>


        <TextInput bind="$elm.router.route"/> <br/> <TextInput bind="pippo.pluto"/><br/>
        <Span bind="pippo.pluto"/>
        <ColorPicker bind="pippo.pluto" defaultValue="#ff0000" debounce={200}/>

        <AppSettings/>

        <ProjectListContainer/>

        <TranslationEditor />

    </div>
)

export default KitchenSink
