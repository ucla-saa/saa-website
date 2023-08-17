
import image from '../photos/directory_photo_neilkardan.jpg';
import Member from '../models/Member';

const Directory = () => {
    interface testUser {
        bod: boolean,
        committee: string,
        email: string,
        major: string,
        makeupHours: number,
        name: string,
        position: string,
        taskList: number[]
    }

    let testUser = {
        bod: false,
        committee: 'Internal Relations',
        email: 'neil@gmail.com',
        major: 'Computer Science',
        makeupHours: 0,
        name: 'Neil Kardan',
        position: 'Executive Director',
        taskList: [0]
    }
    let criteria = 'Internal Relations'
    let urls = '../photos/directory_photo_neilkardan.jpg';
    const users = [testUser];
    return (
        <div className="Directory">
            {users
                .filter(x => x.committee == criteria)
                .map(x => (
                    <Member
                        bod={x.bod}
                        committee={x.committee}
                        email={x.email}
                        major={x.major}
                        makeupHours={x.makeupHours}
                        name={x.name}
                        position={x.position}
                        taskList={x.taskList}
                    />
                ))}  
        </div>
    )
}

export default Directory;