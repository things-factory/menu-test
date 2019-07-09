import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Menu, MenuButton } from '@things-factory/menu-base'
import { MENU_BUTTONS as SEED_MENU_BUTTONS } from '../seed-data/menu-buttons'

export class SeedMenuButton1557925106051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MenuButton)
    const menuRepository = getRepository(Menu)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    try {
      SEED_MENU_BUTTONS.forEach(async button => {
        const menu = await menuRepository.findOne({
          domain,
          name: button.menuName
        })

        repository.save({
          ...button,
          domain,
          menu
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // TODO
  }
}
