import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactory } from './factory';
import { User } from '@common/decorators/user.decorator';
import { AuthGuard } from '@common/index';

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactory: CategoryFactory,
  ) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() user: any,
  ) {
    const category = this.categoryFactory.createCategory(
      createCategoryDto,
      user,
    );
    const createdCategory = await this.categoryService.create(category);

    return {
      message: 'Category created successfully',
      success: true,
      category: createdCategory,
    };
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
