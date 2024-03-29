import React from 'react';

import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { RiInboxArchiveLine, RiInboxUnarchiveLine } from 'react-icons/ri';

const Note = (props) => {
    const {
        id,
        title,
        desc,
        pinned,
        archive,
        deleteNote,
        archiveNote,
        unarchiveNote,
        pinNote,
        unpinNote,
        onNoteClick,
        fromSearch,
    } = props;
    const type = pinned ? 'pinned' : archive ? 'archive' : 'notes';

    const handleDelete = () => {
        deleteNote(id, type, fromSearch);
    };

    const handleArcUnarc = () => {
        if (archive) {
            unarchiveNote(id, fromSearch);
            return;
        }
        archiveNote(id, type, fromSearch);
    };

    const handlePinUnpin = () => {
        if (pinned) {
            unpinNote(id, fromSearch);
            return;
        }
        pinNote(id, type, fromSearch);
    };

    const handleCardClick = (e) => {
        if (e.target.tagName === 'BUTTON') return;
        onNoteClick({ id, title, desc });
    };

    return (
        // eslint-disable-next-line
        <div
            className="note-card"
            onClick={onNoteClick ? handleCardClick : undefined}
        >
            <div className="top">
                {title ? (
                    <h2 className="title">{title}</h2>
                ) : (
                    <p className="desc">{desc}</p>
                )}
                <button
                    type="button"
                    className={`noptr cb pin-btn ${!pinned ? 'ho-vi' : ''}`}
                    title={`${pinned ? 'Unpin Note' : 'Pin Note'}`}
                    onClick={handlePinUnpin}
                >
                    {pinned ? (
                        <AiFillPushpin className="pin" />
                    ) : (
                        <AiOutlinePushpin className="pin" />
                    )}
                </button>
            </div>
            {title && <p className="desc">{desc}</p>}
            <div className="bottom">
                <button
                    type="button"
                    className="noptr cb arc-btn ho-vi"
                    onClick={handleArcUnarc}
                    title={`${archive ? 'Unarchive Note' : 'Archive Note'}`}
                >
                    {!archive ? (
                        <RiInboxArchiveLine className="arc-icon" />
                    ) : (
                        <RiInboxUnarchiveLine className="arc-icon" />
                    )}
                </button>
                <button
                    type="button"
                    className="noptr cb arc-btn ho-vi"
                    onClick={handleDelete}
                    title="Delete Note"
                >
                    <IoMdTrash className="arc-icon" />
                </button>
            </div>
        </div>
    );
};

export default Note;
