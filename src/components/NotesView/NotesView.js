import React, { useState } from 'react';

import _ from 'lodash';
import { AiOutlineClose } from 'react-icons/ai';
import { connect } from 'react-redux';

import {
    archiveNote,
    deleteNote,
    pinNote,
    unarchiveNote,
    unpinNote,
} from '../../redux/actions/notesActions';
import Modal from '../Modal/Modal';
import Note from './Note';

const NotesView = (props) => {
    const {
        cards,
        deleteNote,
        archiveNote,
        pinned,
        archive,
        unarchiveNote,
        pinNote,
        unpinNote,
        fromSearch,
    } = props;

    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const handleNoteClick = (data) => {
        setModal(true);
        setModalData(data);
    };

    const handleModalClose = () => {
        setModal(false);
        setModalData({});
    };

    return (
        <div className="notes-view-wrapper">
            <Modal open={modal} onClose={handleModalClose}>
                <div className="view-details">
                    {modalData.title && (
                        <h1 className="vd-title">{modalData.title}</h1>
                    )}
                    {modalData.desc && (
                        <p className="vd-desc">{modalData.desc}</p>
                    )}
                    <button
                        type="button"
                        className="close-btn"
                        onClick={handleModalClose}
                    >
                        Close
                    </button>
                </div>
            </Modal>
            {cards &&
                _.isArray(cards) &&
                cards.map((c) => (
                    <Note
                        {...c}
                        key={c.id}
                        pinned={pinned}
                        archive={archive}
                        deleteNote={deleteNote}
                        archiveNote={archiveNote}
                        unarchiveNote={unarchiveNote}
                        pinNote={pinNote}
                        unpinNote={unpinNote}
                        onNoteClick={handleNoteClick}
                        fromSearch={fromSearch}
                    />
                ))}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNote: (id, type, sResults) => {
            dispatch(deleteNote(id, type, sResults));
        },
        archiveNote: (id, type, sResults) => {
            dispatch(archiveNote(id, type, sResults));
        },
        unarchiveNote: (id, sResults) => dispatch(unarchiveNote(id, sResults)),
        pinNote: (id, type, sResults) => dispatch(pinNote(id, type, sResults)),
        unpinNote: (id, sResults) => dispatch(unpinNote(id, sResults)),
    };
};

export default connect(null, mapDispatchToProps)(NotesView);
